import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "@/components/ui/input";

const SignUpForm = () => {
  return (
    <form className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="eg:john" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="eg:abc@gmail.com" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="eg:************" />
      </div>

      <Button className="w-full">Sign Up</Button>
    </form>
  );
};
export default SignUpForm;
