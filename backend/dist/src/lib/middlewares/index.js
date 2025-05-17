"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpVerifySession = otpVerifySession;
exports.userAuthSession = userAuthSession;
exports.adminOtpVerifySession = adminOtpVerifySession;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
function otpVerifySession(req, res, next) {
    var _a;
    const authHeader = (_a = req.headers["authorization"]) !== null && _a !== void 0 ? _a : "";
    if (typeof authHeader !== "string") {
        console.log("no auth header available");
        return res
            .status(401)
            .json({ success: false, message: config_1.responseMessages.invalidJwt });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(authHeader, `${process.env.JWT_SECRET}`);
        //@ts-ignore
        const userId = decode.userId;
        //@ts-ignore
        req.userId = userId;
        return next();
    }
    catch (error) {
        console.log(error);
        return res
            .status(401)
            .json({ success: false, message: config_1.responseMessages.invalidJwt });
    }
}
function userAuthSession(req, res, next) {
    var _a;
    const authHeader = (_a = req.headers["authorization"]) !== null && _a !== void 0 ? _a : "";
    if (typeof authHeader === "undefined") {
        return res
            .status(401)
            .json({ success: false, message: config_1.responseMessages.invalidJwt });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(authHeader, `${process.env.JWT_SECRET}`);
        //@ts-ignore
        const userId = decode.userId;
        //@ts-ignore
        req.userId = userId;
        return next();
    }
    catch (error) {
        console.log(error);
        return res
            .status(401)
            .json({ success: false, message: config_1.responseMessages.invalidJwt });
    }
}
function adminOtpVerifySession(req, res, next) {
    var _a;
    const authHeader = (_a = req.headers["authorization"]) !== null && _a !== void 0 ? _a : "";
    if (typeof authHeader !== "string") {
        console.log("no auth header available");
        return res
            .status(401)
            .json({ success: false, message: config_1.responseMessages.invalidJwt });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(authHeader, `${process.env.JWT_SECRET}`);
        //@ts-ignore
        const adminFromJwt = decode.adminId;
        //@ts-ignore
        req.adminId = adminFromJwt;
        return next();
    }
    catch (error) {
        console.log(error);
        return res
            .status(401)
            .json({ success: false, message: config_1.responseMessages.invalidJwt });
    }
}
