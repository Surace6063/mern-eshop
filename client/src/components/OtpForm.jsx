import { useState } from "react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const OtpForm = () => {
  const [otp, setOtp] = useState("")

  const handleVerify = () => {
    console.log("OTP entered:", otp)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm gap-6 mx-auto">
      
      {/* Heading */}
      <div className="space-y-1 text-center">
        <h3 className="text-lg font-semibold">Verify your email</h3>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit verification code
        </p>
      </div>

      <div className="flex flex-col items-center justify-center w-full space-y-5">
        
        {/* OTP Inputs */}
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={otp}
          onChange={(value) => setOtp(value)}
        >
          <InputOTPGroup className="justify-center">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          className="w-full max-w-60"
          size="sm"
        >
          Verify OTP
        </Button>

        {/* Divider */}
        <div className="flex items-center w-full gap-4">
          <Separator className="flex-1" />
          <span className="text-sm text-muted-foreground">
            Didn't receive a code?
          </span>
          <Separator className="flex-1" />
        </div>

        {/* Resend */}
        <button
          type="button"
          className="text-sm font-medium transition text-primary hover:underline"
        >
          Resend OTP
        </button>

      </div>
    </div>
  )
}

export default OtpForm