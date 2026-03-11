import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import useAuthMode from "../zustand/useAuthMode"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerValidationSchema } from "./validations/authValidation"
import { Spinner } from "@/components/ui/spinner"
import { useRegisterUser } from "../api/authServices"
import toast from "react-hot-toast"

const SignUpForm = () => {
  const { setMode, setEmail } = useAuthMode()

  // reack hook form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerValidationSchema)
  })

  // post using useMutation hook from tanstack-query
  const { mutate, isPending } = useRegisterUser()

  const handleRegister = async (data) => {
    const { cpassword, ...registerData } = data
    mutate(registerData, {
      onSuccess: (data) => {
        toast.success(data?.message) // success message
        setMode("otp") // move to otp form
        // // setting email to global state, to acess in opt form
        setEmail(data.email)
      },
      onError: (error) => {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message)
        }
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h3 className="text-base font-medium leading-snug">
          Create an account
        </h3>
        <p className="text-sm text-muted-foreground">
          Enter your details below to create an account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
        {/* FullName */}
        <div className="space-y-2">
          <Label htmlFor="fname">Full Name</Label>
          <Input
            {...register("fullName")}
            id="fname"
            placeholder="eg: John Doe"
            error={errors?.fullName?.message}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            id="email"
            placeholder="eg: john@example.com"
            error={errors?.email?.message}
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="eg: ************"
            error={errors?.password?.message}
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="cpassword">Confirm Password</Label>
          <Input
            {...register("cpassword")}
            id="cpassword"
            type="password"
            placeholder="eg: ************"
            error={errors?.cpassword?.message}
          />
        </div>

        {/* Button */}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Spinner /> signing up
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-sm text-muted-foreground">or continue with</span>
        <Separator className="flex-1" />
      </div>

      {/* Google Button */}
      <Button variant="outline" className="w-full">
        Continue with Google
      </Button>

      {/* Switch */}
      <div className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <span
          onClick={() => setMode("signIn")}
          className="cursor-pointer text-primary underline"
        >
          Sign In
        </span>
      </div>
    </div>
  )
}

export default SignUpForm
