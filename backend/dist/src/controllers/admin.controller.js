"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.changeMemberStatus = exports.getMember = exports.verifyOtp = exports.signup = exports.signin = void 0;
const config_1 = require("../config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../lib/db");
const schema_1 = require("../lib/db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// member signup
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    // checks
    if (typeof email !== "string" ||
        typeof name !== "string" ||
        typeof password !== "string") {
        return res
            .status(400)
            .json({ success: false, message: config_1.responseMessages.invalidInput });
    }
    // hash password
    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
    // otp generator
    const otp = (0, config_1.generateOtp)(6);
    console.log(otp);
    // hash otp
    const hashedOtp = bcrypt_1.default.hashSync(otp, 10);
    // db query
    try {
        // check if already exists
        const dbValidator = yield db_1.db
            .select()
            .from(schema_1.admin)
            .where((0, drizzle_orm_1.eq)(schema_1.admin.email, email));
        if (dbValidator.length !== 0) {
            return res
                .status(400)
                .json({ success: false, message: config_1.responseMessages.emailAlreadyExists });
        }
        // create if not exists
        const createAdmin = yield db_1.db
            .insert(schema_1.admin)
            .values({
            email: email,
            name: name,
            userName: email,
            password: hashedPassword,
            otp: hashedOtp,
        })
            .returning({ id: schema_1.admin.id });
        const jwt_token = jsonwebtoken_1.default.sign({ adminId: createAdmin[0].id }, `${process.env.JWT_SECRET}`);
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
            message: config_1.responseMessages.signupSuccess,
            admin: createAdmin,
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: config_1.responseMessages.serverError });
    }
});
exports.signup = signup;
// member otp verify
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const adminFromJwt = req.adminId;
    const { otp } = req.body;
    if (typeof adminFromJwt !== "number") {
        return res
            .status(401)
            .json({ success: false, message: config_1.responseMessages.invalidInput });
    }
    try {
        const getUser = yield db_1.db
            .select({
            otp: schema_1.admin.otp,
            id: schema_1.admin.id,
            name: schema_1.admin.name,
            username: schema_1.admin.userName,
        })
            .from(schema_1.admin)
            .where((0, drizzle_orm_1.eq)(schema_1.admin.id, adminFromJwt));
        const dbOTP = getUser[0].otp;
        // decode otp
        const compare = yield bcrypt_1.default.compare(otp, dbOTP);
        if (compare) {
            yield db_1.db
                .update(schema_1.admin)
                .set({
                isAccountVerified: true,
            })
                .where((0, drizzle_orm_1.eq)(schema_1.admin.id, adminFromJwt));
            const jwt_token = jsonwebtoken_1.default.sign({ adminId: getUser[0].id }, `${process.env.JWT_SECRET}`);
            return res
                .cookie("_fit_life_gym_auth_admin", jwt_token, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
                .status(200)
                .json({
                success: true,
                message: config_1.responseMessages.signin,
                username: getUser[0].username,
                name: getUser[0].name,
            });
        }
        return res
            .status(401)
            .json({ success: false, message: config_1.responseMessages.invalidOtp });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: config_1.responseMessages.serverError });
    }
});
exports.verifyOtp = verifyOtp;
// member signin
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (typeof email !== "string" || typeof password !== "string") {
        return res
            .status(401)
            .json({ success: false, message: config_1.responseMessages.invalidInput });
    }
    try {
        const getDbUser = yield db_1.db
            .select({
            id: schema_1.admin.id,
            email: schema_1.admin.email,
            password: schema_1.admin.password,
            isVerified: schema_1.admin.isAccountVerified,
            username: schema_1.admin.userName,
            name: schema_1.admin.name,
        })
            .from(schema_1.admin)
            .where((0, drizzle_orm_1.eq)(schema_1.admin.email, email));
        if (getDbUser.length === 0) {
            return res
                .status(401)
                .json({ success: false, message: config_1.responseMessages.notFound });
        }
        if (!getDbUser[0].isVerified) {
            return res
                .status(401)
                .json({ success: false, message: "This account is not verified." });
        }
        const dbPassword = getDbUser[0].password;
        const compare = yield bcrypt_1.default.compare(password, dbPassword);
        if (!compare) {
            return res
                .status(401)
                .json({ success: false, message: config_1.responseMessages.notAuthorized });
        }
        const jwt_token = jsonwebtoken_1.default.sign({ adminId: getDbUser[0].id }, `${process.env.JWT_SECRET}`);
        return res
            .cookie("_fit_life_gym_auth_admin", jwt_token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .status(200)
            .json({
            success: true,
            message: config_1.responseMessages.signin,
            username: getDbUser[0].username,
            name: getDbUser[0].name,
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: config_1.responseMessages.serverError });
    }
});
exports.signin = signin;
// get members
const getMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getMembers = yield db_1.db
            .select({
            memberId: schema_1.member.id,
            name: schema_1.member.name,
            email: schema_1.member.email,
            isActive: schema_1.member.isAactive,
            subscriptionStarted: schema_1.member.subscriptionStart,
            subscriptionEnds: schema_1.member.subscriptionEnd,
            selectedPlan: schema_1.member.selectedPlan,
        })
            .from(schema_1.member);
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
});
exports.getMember = getMember;
// update member active status
const changeMemberStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, memberId } = req.query;
    function getBool() {
        if (status === "Inactive") {
            return false;
        }
        return true;
    }
    console.log(getBool());
    try {
        const updateStatus = yield db_1.db
            .update(schema_1.member)
            .set({
            isAactive: getBool(),
        })
            .where((0, drizzle_orm_1.eq)(schema_1.member.id, Number(memberId))).returning();
        if (updateStatus.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Something went wrong while updating."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Update success."
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
});
exports.changeMemberStatus = changeMemberStatus;
// delete member
const deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.query;
    if (typeof data === "undefined") {
        return res.status(400).json({
            success: false,
            message: "Invalid data received from client"
        });
    }
    try {
        const deleteMemberById = yield db_1.db.delete(schema_1.member).where((0, drizzle_orm_1.eq)(schema_1.member.id, Number(data))).returning();
        if (deleteMemberById.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Something went wrong while deleting."
            });
        }
        return res.status(200).json({ success: true, message: "Delete success" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.deleteMember = deleteMember;
