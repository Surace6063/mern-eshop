import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import useAuthMode from "../zustand/useAuthMode"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Spinner } from "@/components/ui/spinner"
import { loginValidationSchema } from "./validations/authValidation"
import { useLoginUser } from "../api/authServices"
import toast from "react-hot-toast"
import useAuthStore from "../zustand/useAuth"
import { useNavigate } from "react-router-dom"
import GoogleLoginButton from "./GoogleLoginButton"

const SignInForm = () => {
  const { setMode, setOpen } = useAuthMode()
  const {setUser} = useAuthStore()
  const navigate = useNavigate()

  // reack hook form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginValidationSchema)
  })

  const {mutate,isPending} = useLoginUser()

  const handleLogin = (data) => {
     mutate(data, {
      onSuccess: (data) => {
        toast.success(data?.message) // success message
        setOpen(false)
        setUser(data.user) // set user response to gloabl user state

        if(data.user.role === "admin"){
          navigate("/dashboard/main")
        }
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
          Login to your account
        </h3>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
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

        {/* Button */}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Spinner /> signing in
            </>
          ) : (
            "Sign In"
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
      <GoogleLoginButton />

      {/* Switch */}
      <div className="text-sm text-muted-foreground">
        Don't have an account?{" "}
        <span
          onClick={() => setMode("signUp")}
          className="cursor-pointer text-primary underline"
        >
          Sign Up
        </span>
      </div>
    </div>
  )
}

export default SignInForm
