import { Router } from "express";
import {
  getProfileDetails,
  logout,
  selectPlan,
  signin,
  signup,
  updateDob,
  updateGender,
  updateName,
  updateProfession,
  updateProfilePhoto,
  updateUserName,
  verifyOtp,
} from "../controllers/member.controller";
import { otpVerifySession, userAuthSession } from "../lib/middlewares";

const router = Router();

router.post("/member/auth/signup", signup);
router.post("/member/auth/verify-otp", otpVerifySession, verifyOtp);
router.post("/member/auth/signin", signin);
router.get("/member/profile/get-profile", userAuthSession, getProfileDetails);
router.put(
  "/member/profile/update-username",
  userAuthSession,
  updateUserName
);
router.put(
  "/member/profile/update-name",
  userAuthSession,
  updateName
);
router.put("/member/profile/plan-selection", userAuthSession, selectPlan)
router.put("/member/profile/update-profession", userAuthSession, updateProfession)
router.put("/member/profile/update-gender", userAuthSession, updateGender)
router.put("/member/profile/update-dob", userAuthSession, updateDob)
router.put("/member/profile/update-profile-photo", userAuthSession, updateProfilePhoto)
router.post("/member/logout", logout)

export default router;
