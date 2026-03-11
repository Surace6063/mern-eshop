import { useState } from "react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import useAuthMode from "../zustand/useAuthMode"
import { useEmailVerifyToken } from "../api/authServices"
import { Spinner } from "@/components/ui/spinner"
import toast from "react-hot-toast"

const OtpForm = () => {
  const { email, setMode } = useAuthMode()
  const [otp, setOtp] = useState("")

  const { mutate, isPending } = useEmailVerifyToken()

  const handleVerify = () => {
    const otpData = {
      email,
      token: otp
    }
    mutate(otpData, {
      onSuccess: (data) => {
        toast.success(data?.message) // success message
        setMode("signIn") // move to sign in form
      },
      onError: (error) => {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message)
        }
      }
    })
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm gap-6 mx-auto">
      {/* Heading */}
      <div className="space-y-1 text-center">
        <h3 className="text-lg font-semibold">Verify your email</h3>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit verification code send to: 
          <br />
          <p className="text-center">{email}</p>
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
        <Button disabled={isPending} onClick={handleVerify} className="w-full max-w-60" size="sm">
         {
          isPending ? <> <Spinner /> verifying... </> : " Verify OTP"
         }
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
