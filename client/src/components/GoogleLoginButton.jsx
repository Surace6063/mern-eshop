import { Button } from "@/components/ui/button"

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    const currentPath = window.location.pathname

    window.location.href = `http://localhost:4000/api/auth/google?redirect=${currentPath}`
  }

  return (
    <Button
      onClick={handleGoogleLogin}
      variant="outline"
      className="w-full flex gap-2 items-center"
    >
      <img src="/google.png" alt="google" className="size-3" />
      <span> Continue with Google </span>
    </Button>
  )
}
export default GoogleLoginButton
