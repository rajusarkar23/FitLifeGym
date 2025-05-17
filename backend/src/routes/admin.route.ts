import { Router } from "express";
import { changeMemberStatus, deleteMember, getMember, signin, signup, verifyOtp } from "../controllers/admin.controller";
import { adminOtpVerifySession } from "../lib/middlewares";

const router = Router()

router.post("/admin/auth/signin", signin)
router.post("/admin/auth/signup", signup)
router.post("/admin/auth/verify-otp", adminOtpVerifySession, verifyOtp)
router.get("/admin/get-members", adminOtpVerifySession, getMember)
router.put("/admin/update-member-status", changeMemberStatus)
router.delete("/admin/delete-member", deleteMember)

export default router;