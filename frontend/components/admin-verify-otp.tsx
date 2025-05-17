"use client";

import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/store/admin-store";

export function AdminVerifyOtp({ cookie }: { cookie: string }) {
  const [otpValue, setOtpValue] = useState("");
  const { verifyOtp } = useAdminStore();
  const router = useRouter();

  const handleClick = async () => {
    await verifyOtp({ otp: otpValue, authCookie: cookie });

    if (
      useAdminStore.getState().isOtpVerificationSuccess && useAdminStore.getState().isAuthenticated && useAdminStore.getState().isSigninSuccess
    ) {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="space-y-2 justify-center flex flex-col items-center mx-auto min-h-[80vh]">
      <div>
        <h2>Please enter your OTP</h2>
      </div>
      <InputOTP
        maxLength={6}
        value={otpValue}
        onChange={(otp) => setOtpValue(otp)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {otpValue === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {otpValue}</>
        )}
      </div>
      <div>
        {useAdminStore.getState().isError && (
          <p className="text-sm text-red-600">
            {useAdminStore.getState().errorMessage}
          </p>
        )}
      </div>

      <div>
        {useAdminStore.getState().isLoading ? (
          <Button disabled variant={"outline"}>
            <LoaderCircle className="animate-spin" />
          </Button>
        ) : (
          <Button type="submit" onClick={handleClick}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
