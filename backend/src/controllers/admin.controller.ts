import { Request } from "express";
import { generateOtp, responseMessages } from "../config";
import bcrypt from "bcrypt";
import { db } from "../lib/db";
import { admin, member } from "../lib/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

// member signup
const signup = async (req: Request, res: any) => {
  const { email, name, password } = req.body;

  // checks
  if (
    typeof email !== "string" ||
    typeof name !== "string" ||
    typeof password !== "string"
  ) {
    return res
      .status(400)
      .json({ success: false, message: responseMessages.invalidInput });
  }
  // hash password
  const hashedPassword = bcrypt.hashSync(password, 10);
  // otp generator
  const otp = generateOtp(6);
  console.log(otp);

  // hash otp
  const hashedOtp = bcrypt.hashSync(otp, 10);
  // db query
  try {
    // check if already exists
    const dbValidator = await db
      .select()
      .from(admin)
      .where(eq(admin.email, email));
    if (dbValidator.length !== 0) {
      return res
        .status(400)
        .json({ success: false, message: responseMessages.emailAlreadyExists });
    }
    // create if not exists
    const createAdmin = await db
      .insert(admin)
      .values({
        email: email,
        name: name,
        userName: email,
        password: hashedPassword,
        otp: hashedOtp,
      })
      .returning({ id: admin.id });

    const jwt_token = jwt.sign(
      { adminId: createAdmin[0].id },
      `${process.env.JWT_SECRET}`
    );

    return res
      .cookie("_fit_life_gym_verify_admin", jwt_token, {
        httpOnly: true,
        maxAge: 10 * 60 * 1000,
        sameSite: true,
        secure: true,
      })
      .status(201)
      .json({
        success: true,
        message: responseMessages.signupSuccess,
        admin: createAdmin,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: responseMessages.serverError });
  }
};

// member otp verify
const verifyOtp = async (req: Request, res: any) => {
  //@ts-ignore
  const adminFromJwt = req.adminId;

  const { otp } = req.body;

  if (typeof adminFromJwt !== "number") {
    return res
      .status(401)
      .json({ success: false, message: responseMessages.invalidInput });
  }

  try {
    const getUser = await db
      .select({
        otp: admin.otp,
        id: admin.id,
        name: admin.name,
        username: admin.userName,
      })
      .from(admin)
      .where(eq(admin.id, adminFromJwt));
    const dbOTP = getUser[0].otp;

    // decode otp
    const compare = await bcrypt.compare(otp, dbOTP);

    if (compare) {
      await db
        .update(admin)
        .set({
          isAccountVerified: true,
        })
        .where(eq(admin.id, adminFromJwt));

      const jwt_token = jwt.sign(
        { adminId: getUser[0].id },
        `${process.env.JWT_SECRET}`
      );

      return res
        .cookie("_fit_life_gym_auth_admin", jwt_token, {
          httpOnly: true,
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          success: true,
          message: responseMessages.signin,
          username: getUser[0].username,
          name: getUser[0].name,
        });
    }

    return res
      .status(401)
      .json({ success: false, message: responseMessages.invalidOtp });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: responseMessages.serverError });
  }
};

// member signin
const signin = async (req: Request, res: any) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    return res
      .status(401)
      .json({ success: false, message: responseMessages.invalidInput });
  }

  try {
    const getDbUser = await db
      .select({
        id: admin.id,
        email: admin.email,
        password: admin.password,
        isVerified: admin.isAccountVerified,
        username: admin.userName,
        name: admin.name,
      })
      .from(admin)
      .where(eq(admin.email, email));

    if (getDbUser.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: responseMessages.notFound });
    }

    if (!getDbUser[0].isVerified) {
      return res
        .status(401)
        .json({ success: false, message: "This account is not verified." });
    }

    const dbPassword = getDbUser[0].password;

    const compare = await bcrypt.compare(password, dbPassword);
    if (!compare) {
      return res
        .status(401)
        .json({ success: false, message: responseMessages.notAuthorized });
    }

    const jwt_token = jwt.sign(
      { adminId: getDbUser[0].id },
      `${process.env.JWT_SECRET}`
    );
    return res
      .cookie("_fit_life_gym_auth_admin", jwt_token, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: responseMessages.signin,
        username: getDbUser[0].username,
        name: getDbUser[0].name,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: responseMessages.serverError });
  }
};

// get members
const getMember = async (req: Request, res: any) => {
  try {
    const getMembers = await db
      .select({
        memberId: member.id,
        name: member.name,
        email: member.email,
        isActive: member.isAactive,
        subscriptionStarted: member.subscriptionStart,
        subscriptionEnds: member.subscriptionEnd,
        selectedPlan: member.selectedPlan,
      })
      .from(member);

    if (getMembers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No members found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Members fetched",
      members: getMembers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// update member active status
const changeMemberStatus = async (req: Request, res: any) => {
  const { status, memberId } = req.query;

  function getBool() {
    if (status === "Inactive") {
      return false;
    }
    return true;
  }
  console.log(getBool());

  try {
    const updateStatus = await db
      .update(member)
      .set({
        isAactive: getBool(),
      })
      .where(eq(member.id, Number(memberId))).returning()

      if (updateStatus.length === 0) {
          return res.status(400).json({
            success: false,
            message: "Something went wrong while updating."
          })
      }

      return res.status(200).json({
        success: true,
        message: "Update success."
      })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    })
  }
};

// delete member
const deleteMember = async (req: Request, res: any) => {
  const {data} = req.query;
  if (typeof data === "undefined") {
    return res.status(400).json({
      success: false,
      message: "Invalid data received from client"
    })
  }

  try {
    const deleteMemberById = await db.delete(member).where(eq(member.id, Number(data))).returning()
    
    if (deleteMemberById.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong while deleting."
      })
    }
    
    return res.status(200).json({success: true, message: "Delete success"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: "Internal server error"})
  }
}

export { signin, signup, verifyOtp, getMember, changeMemberStatus, deleteMember };
