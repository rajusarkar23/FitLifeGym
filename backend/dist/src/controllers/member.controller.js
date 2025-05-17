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
exports.logout = exports.updateProfilePhoto = exports.updateDob = exports.updateGender = exports.updateProfession = exports.selectPlan = exports.updateName = exports.updateUserName = exports.getProfileDetails = exports.signin = exports.verifyOtp = exports.signup = void 0;
const db_1 = require("../lib/db");
const schema_1 = require("../lib/db/schema");
const config_1 = require("../config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const drizzle_orm_1 = require("drizzle-orm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// member signup
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { signupData } = req.body;
    // checks
    if (typeof signupData.data.name !== "string" ||
        typeof signupData.data.email !== "string" ||
        typeof signupData.data.password !== "string") {
        return res
            .status(400)
            .json({ success: false, message: config_1.responseMessages.invalidInput });
    }
    // hash password
    const hashedPassword = bcrypt_1.default.hashSync(signupData.data.password, 10);
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
            .from(schema_1.member)
            .where((0, drizzle_orm_1.eq)(schema_1.member.email, signupData.data.email));
        if (dbValidator.length !== 0) {
            return res
                .status(400)
                .json({ success: false, message: config_1.responseMessages.emailAlreadyExists });
        }
        // create if not exists
        const createMember = yield db_1.db
            .insert(schema_1.member)
            .values({
            email: signupData.data.email,
            name: signupData.data.name,
            userName: signupData.data.email,
            password: hashedPassword,
            subscriptionStart: new Date().toString(),
            otp: hashedOtp,
        })
            .returning({ id: schema_1.member.id });
        const jwt_token = jsonwebtoken_1.default.sign({ userId: createMember[0].id }, `${process.env.JWT_SECRET}`);
        return res
            .cookie("_fit_life_gym_verify", jwt_token, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000,
            sameSite: true,
            secure: true,
        })
            .status(201)
            .json({
            success: true,
            message: config_1.responseMessages.signupSuccess,
            member: createMember,
            token: jwt_token,
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
    const user = req.userId;
    const { otp } = req.body;
    if (typeof user !== "number") {
        return res
            .status(401)
            .json({ success: false, message: config_1.responseMessages.invalidInput });
    }
    try {
        const getUser = yield db_1.db
            .select({
            otp: schema_1.member.otp,
            id: schema_1.member.id,
            username: schema_1.member.userName,
            selectedPlan: schema_1.member.selectedPlan,
            isPlanSelected: schema_1.member.isPlanSelected,
        })
            .from(schema_1.member)
            .where((0, drizzle_orm_1.eq)(schema_1.member.id, user));
        const dbOTP = getUser[0].otp;
        // decode otp
        const compare = yield bcrypt_1.default.compare(otp, dbOTP);
        if (compare) {
            yield db_1.db
                .update(schema_1.member)
                .set({
                isAccountVerified: true,
            })
                .where((0, drizzle_orm_1.eq)(schema_1.member.id, user));
            const jwt_token = jsonwebtoken_1.default.sign({ userId: getUser[0].id }, `${process.env.JWT_SECRET}`);
            return res
                .cookie("_fit_life_gym_auth", jwt_token, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
                .status(200)
                .json({
                success: true,
                message: config_1.responseMessages.signin,
                username: getUser[0].username,
                selectedPlan: getUser[0].selectedPlan,
                isPlanSelected: getUser[0].isPlanSelected,
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
    const { signinData } = req.body;
    if (typeof signinData.data.email !== "string" ||
        typeof signinData.data.password !== "string") {
        return res
            .status(401)
            .json({ success: false, message: config_1.responseMessages.invalidInput });
    }
    try {
        const getDbUser = yield db_1.db
            .select({
            id: schema_1.member.id,
            email: schema_1.member.email,
            password: schema_1.member.password,
            isVerified: schema_1.member.isAccountVerified,
            username: schema_1.member.userName,
            name: schema_1.member.name,
            selectedPlan: schema_1.member.selectedPlan,
            isPlanSelected: schema_1.member.isPlanSelected,
        })
            .from(schema_1.member)
            .where((0, drizzle_orm_1.eq)(schema_1.member.email, signinData.data.email));
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
        const compare = yield bcrypt_1.default.compare(signinData.data.password, dbPassword);
        if (!compare) {
            return res
                .status(401)
                .json({ success: false, message: config_1.responseMessages.notAuthorized });
        }
        const jwt_token = jsonwebtoken_1.default.sign({ userId: getDbUser[0].id }, `${process.env.JWT_SECRET}`);
        return res
            // .cookie("_fit_life_gym_auth", jwt_token, {
            //   httpOnly: true,
            //   secure: true,
            //   maxAge: 7 * 24 * 60 * 60 * 1000,
            // })
            .status(200)
            .json({
            success: true,
            message: config_1.responseMessages.signin,
            username: getDbUser[0].username,
            name: getDbUser[0].name,
            selectedPlan: getDbUser[0].selectedPlan,
            isPlanSelected: getDbUser[0].isPlanSelected,
            authCookie: jwt_token
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
// get profile details
const getProfileDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.query;
    //@ts-ignore
    const user = req.userId;
    if (typeof userName.userName !== "string" || typeof user !== "number") {
        return res.status(400).json({
            success: false,
            message: "User verification failed, login again",
        });
    }
    try {
        const getUser = yield db_1.db
            .select({
            imageUrl: schema_1.member.profileImage,
            name: schema_1.member.name,
            userName: schema_1.member.userName,
            dob: schema_1.member.dob,
            gender: schema_1.member.gender,
            profession: schema_1.member.profession,
            memberId: schema_1.member.id,
            planPurchasedOn: schema_1.member.subscriptionStart,
            planEndsOn: schema_1.member.subscriptionEnd,
        })
            .from(schema_1.member)
            .where((0, drizzle_orm_1.eq)(schema_1.member.id, user));
        if (getUser.length === 0 || userName.userName !== getUser[0].userName) {
            return res
                .status(401)
                .json({ success: false, message: "No member found." });
        }
        return res.status(201).json({
            success: true,
            message: "member fetched",
            memberProfile: getUser,
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: config_1.responseMessages.serverError });
    }
});
exports.getProfileDetails = getProfileDetails;
// update username
const updateUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const user = req.userId;
    const { newUserName } = req.body;
    if (typeof user !== "number" || typeof newUserName !== "string") {
        return res.status(400).json({
            success: false,
            message: "Information is not sufficient or incorrect to procced with this request.",
        });
    }
    try {
        const getDbUser = yield db_1.db
            .update(schema_1.member)
            .set({
            userName: newUserName,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.member.id, user))
            .returning({ username: schema_1.member.userName });
        if (getDbUser.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "Unable to update your username" });
        }
        return res.status(201).json({
            success: true,
            message: "Username updated successfully",
            username: getDbUser[0].username,
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: config_1.responseMessages.serverError });
    }
});
exports.updateUserName = updateUserName;
// update name
const updateName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const user = req.userId;
    const { newName } = req.body;
    if (typeof user !== "number" || typeof newName !== "string") {
        return res.status(400).json({
            success: false,
            message: "Information is not sufficient or incorrect to procced with this request.",
        });
    }
    try {
        const getDbUser = yield db_1.db
            .update(schema_1.member)
            .set({
            name: newName,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.member.id, user))
            .returning({
            imageUrl: schema_1.member.profileImage,
            userName: schema_1.member.userName,
            name: schema_1.member.name,
            gender: schema_1.member.gender,
            profession: schema_1.member.profession,
            dob: schema_1.member.dob,
        });
        if (getDbUser.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "Unable to update your name" });
        }
        return res.status(201).json({
            success: true,
            message: "Name updated successfully",
            memberProfile: getDbUser[0],
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: config_1.responseMessages.serverError });
    }
});
exports.updateName = updateName;
// handle plan selection
const selectPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { selectedPlan } = req.body;
    //@ts-ignore
    const user = req.userId;
    if (typeof user !== "number" || typeof selectedPlan !== "string") {
        console.log("ran");
        return res.status({
            success: false,
            message: "Invalid data, not able to process",
        });
    }
    const allowedPlansArr = ["basic", "elite", "premium", "none"];
    const plan = selectedPlan;
    const today = new Date();
    function getFurureDate() {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 365);
        return futureDate;
    }
    // db operation
    try {
        const update = yield db_1.db
            .update(schema_1.member)
            .set({
            isPlanSelected: true,
            selectedPlan: plan,
            isAactive: true,
            subscriptionStart: today.toString(),
            subscriptionEnd: getFurureDate().toString(),
        })
            .where((0, drizzle_orm_1.eq)(schema_1.member.id, user))
            .returning({
            selectedPlan: schema_1.member.selectedPlan,
            isPlanSelected: schema_1.member.isPlanSelected,
        });
        return res.status(200).json({
            success: true,
            message: "Plan updated",
            selectedPlan: update[0].selectedPlan,
            isPlanSelected: update[0].isPlanSelected,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.selectPlan = selectPlan;
// update profession
const updateProfession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.query;
    //@ts-ignore
    const user = req.userId;
    if (typeof data !== "string" || typeof user !== "number") {
        return res.status(400).json({
            success: false,
            message: "Not able to update your profession",
        });
    }
    try {
        const updateUser = yield db_1.db
            .update(schema_1.member)
            .set({
            profession: data === null || data === void 0 ? void 0 : data.toString(),
        })
            .where((0, drizzle_orm_1.eq)(schema_1.member.id, user))
            .returning();
        if (updateUser.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Something went wrong",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Profession updated.",
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
exports.updateProfession = updateProfession;
// update gender
const updateGender = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.query;
    //@ts-ignore
    const user = req.userId;
    if (typeof data !== "string" || typeof user !== "number") {
        return res.status(400).json({
            success: false,
            message: "Not able to update your gender",
        });
    }
    const allowedGenderArr = ["male", "female"];
    const gender = data;
    try {
        const updateGenderUser = yield db_1.db
            .update(schema_1.member)
            .set({
            gender: gender,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.member.id, user))
            .returning();
        if (updateGenderUser.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Not able to update gender",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Gender updated successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.updateGender = updateGender;
// update dob
const updateDob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.query;
    //@ts-ignore
    const user = req.userId;
    if (typeof data !== "string" || typeof user !== "number") {
        return res.status(400).json({
            success: false,
            message: "Not able to update your profession",
        });
    }
    try {
        const updateDateofBirth = yield db_1.db
            .update(schema_1.member)
            .set({
            dob: data.toString(),
        })
            .where((0, drizzle_orm_1.eq)(schema_1.member.id, user))
            .returning();
        if (updateDateofBirth.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Not able to update dob",
            });
        }
        return res.status(200).json({
            success: true,
            message: "dob updated successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.updateDob = updateDob;
// update profile photo
const updateProfilePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.query;
    //@ts-ignore
    const user = req.userId;
    if (typeof data !== "string" || typeof user !== "number") {
        return res.status(400).json({
            success: false,
            message: "Not able to update your profile photo",
        });
    }
    try {
        const updateProfile = yield db_1.db
            .update(schema_1.member)
            .set({
            profileImage: data === null || data === void 0 ? void 0 : data.toString(),
        })
            .where((0, drizzle_orm_1.eq)(schema_1.member.id, user)).returning();
        if (updateProfile.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Not able to update your profile"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully."
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
exports.updateProfilePhoto = updateProfilePhoto;
// handle logout
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("_fit_life_gym_auth", {
            httpOnly: true,
            secure: true
        });
        return res.status(200).json({
            success: true,
            message: "Logout success"
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.logout = logout;
