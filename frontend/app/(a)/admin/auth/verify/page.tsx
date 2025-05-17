import { AdminVerifyOtp } from "@/components/admin-verify-otp";
import { cookies } from "next/headers";

const Verify = async () => {
  const cookiesore = await cookies();

  return (
    <div>
      <AdminVerifyOtp cookie={cookiesore.get("_fit_life_gym_verify_admin")?.value!} />
    </div>
  );
};

export default Verify;
