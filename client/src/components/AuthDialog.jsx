import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AuthDialog = () => {
  const [mode, setMode] = useState("signIn");
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">sign in</Button> */}
        <Button>sign in</Button>
      </DialogTrigger>
      <DialogContent>
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          {mode === "signIn" ? "Sign In" : "Sign Up"}
        </h1>
        {/* form */}
        {mode === "signIn" ? <SignInForm /> : <SignUpForm />}

        <div className="mt-2 text-sm font-medium text-gray-600">
          {mode === "signIn" ? (
            <p>
              Dont have an account?{" "}
              <span
                className="cursor-pointer underline text-primary"
                onClick={() => setMode("signUp")}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              Already Have an account?{" "}
              <span
                className="cursor-pointer underline text-primary"
                onClick={() => setMode("signIn")}
              >
                Sign In
              </span>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AuthDialog;
