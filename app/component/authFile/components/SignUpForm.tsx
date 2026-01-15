import React from "react";
import { Input, Label } from "../../elements/Input";
import { Button } from "../../elements/Button";

const SignUpForm = ({
  handleSignup,
  isLoading,
}: {
  handleSignup: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}) => {
  return (
    <>
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <Label>Typing Center Name</Label>
          <Input
            id="center-name"
            type="text"
            name="center-name"
            placeholder="ABC Typing Center"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            id="signup-email"
            type="email"
            name="signup-email"
            placeholder="you@yourcompany.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Password</Label>
          <Input
            id="signup-password"
            type="password"
            name="signup-password"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Secret Key</Label>
          <Input
            id="secret-key"
            type="password"
            name="secret-key"
            placeholder="••••••••"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full border-input bg-ring hover:bg-accent  text-white hover:bg-blue-600 h-11 rounded-md px-8"
          disabled={isLoading}
          text={isLoading ? "Creating account..." : "Create Account"}
        />
      </form>
    </>
  );
};

export default SignUpForm;
