import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { useState } from "react"
import SignInForm from "./SignInForm"
import SignUpForm from "./SignUpForm"
import OtpForm from "./OtpForm"
import useAuthMode from "../zustand/useAuthMode"

const AuthDialog = () => {
  const { mode, setMode, open, setOpen } = useAuthMode()

  const handleDialogClose = (isOpen) => {
    setOpen(isOpen)
    setMode("signIn")
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">sign in</Button> */}
        <Button>sign in</Button>
      </DialogTrigger>
      <DialogContent>
        {mode === "signIn" && <SignInForm />}
        {mode === "signUp" && <SignUpForm />}
        {mode === "otp" && <OtpForm />}
      </DialogContent>
    </Dialog>
  )
}
export default AuthDialog
