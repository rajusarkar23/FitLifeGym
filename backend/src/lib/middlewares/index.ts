import { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { responseMessages } from "../../config";

function otpVerifySession(req: Request, res: any, next: NextFunction) {
  const authHeader = req.headers["authorization"] ?? "";

  if (typeof authHeader !== "string") {
    console.log("no auth header available");
    return res
      .status(401)
      .json({ success: false, message: responseMessages.invalidJwt });
  }
  try {
    const decode = jwt.verify(authHeader, `${process.env.JWT_SECRET}`);
    //@ts-ignore
    const userId = decode.userId;
    //@ts-ignore
    req.userId = userId;
    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: responseMessages.invalidJwt });
  }
}

function userAuthSession(req: Request, res: any, next: NextFunction) {
  const authHeader = req.headers["authorization"] ?? "";
  if (typeof authHeader === "undefined") {
    return res
      .status(401)
      .json({ success: false, message: responseMessages.invalidJwt });
  }

  try {
    const decode = jwt.verify(authHeader, `${process.env.JWT_SECRET}`);
    //@ts-ignore
    const userId = decode.userId;
    //@ts-ignore
    req.userId = userId;
    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: responseMessages.invalidJwt });
  }
}

function adminOtpVerifySession(req: Request, res: any, next: NextFunction) {
  const authHeader = req.headers["authorization"] ?? "";

  if (typeof authHeader !== "string") {
    console.log("no auth header available");
    return res
      .status(401)
      .json({ success: false, message: responseMessages.invalidJwt });
  }
  try {
    const decode = jwt.verify(authHeader, `${process.env.JWT_SECRET}`);
    //@ts-ignore
    const adminFromJwt = decode.adminId;
    //@ts-ignore
    req.adminId = adminFromJwt;
    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: responseMessages.invalidJwt });
  }
}

export { otpVerifySession, userAuthSession, adminOtpVerifySession };
