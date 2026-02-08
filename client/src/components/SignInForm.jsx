import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "@/components/ui/input";

const SignInForm = () => {
  return (
    <form className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="eg:john" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="eg:************" />
      </div>

      <Button className="w-full">Sign In</Button>
    </form>
  );
};
export default SignInForm;
