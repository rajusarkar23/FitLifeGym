"use client";

import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useUserStore } from "@/store/user-store";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function VerifyOtp({cookie}: {cookie: string}) {
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState("")

    const {verify} = useUserStore()

    const router = useRouter()

  const handleClick = async () => {
    setError("")
    await verify({otp: otpValue, authCookie: cookie})
    if (useUserStore.getState().isError) {
        setError(useUserStore.getState().errorMessage!)
    }

    if (useUserStore.getState().isResponseOkay && typeof useUserStore.getState().username === "string" && useUserStore.getState().isPlanSelected === false && useUserStore.getState().selectedPlan === "none") {
        router.push("/plan-selection")
    }

  }

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

        <p className="text-sm text-red-500 font-semibold">{error}</p>
      </div>

      <div>
        {useUserStore.getState().isLoading ? (
          <Button disabled variant={"outline"}>
            <LoaderCircle className="animate-spin" />
          </Button>
        ) : (
          <Button type="submit" onClick={handleClick}>Submit</Button>
        )}
      </div>
    </div>
  );
}
