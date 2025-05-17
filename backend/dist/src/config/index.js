"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileImage = exports.generateOtp = exports.responseMessages = void 0;
exports.responseMessages = {
    signin: "Login success",
    signupSuccess: "Signup success",
    serverError: "Internal server error, try again",
    invalidInput: "Inputs are not accurate",
    notFound: "Nothing found with the provided inputs, make sure inputs are correct",
    notAuthorized: "Unauthorized, check credentials",
    invalidOtp: "Wrong OTP",
    emailAlreadyExists: "This email already exists in the database",
    invalidJwt: "Invalid jwt login again"
};
const generateOtp = (otpLength) => {
    let otp = "";
    for (let i = 0; i < otpLength; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
};
exports.generateOtp = generateOtp;
exports.profileImage = "https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.svg";
