import { VerifyOtp } from "@/components/verify-otp";
import { cookies } from "next/headers";
import React from "react";

const Verify = async () => {
  const cookiesore = await cookies();

  return (
    <div>
      <VerifyOtp cookie={cookiesore.get("_fit_life_gym_verify")?.value!} />
    </div>
  );
};

export default Verify;
