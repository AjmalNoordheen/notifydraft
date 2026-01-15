import React from "react";
import { Input, Label } from "../../elements/Input";
import { Button } from "../../elements/Button";

const LoginForm = ({
  handleLogin,
  isLoading,
}: {
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}) => {
  return (
    <>
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2 text-muted-foreground">
          <Label>Email</Label>
          <Input
            id="login-email"
            name="login-email"
            type="email"
            placeholder="you@yourcompany.com"
            required
          />
        </div>
        <div className="space-y-2 text-muted-foreground">
          <Label>Password</Label>
          <Input
            id="login-password"
            name="login-password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full border-input bg-ring hover:bg-accent  text-white hover:bg-blue-600 h-11 rounded-md px-8"
          disabled={false /* isLoading */}
          text={isLoading ? "Signing in..." : "Sign In"}
        />
      </form>
    </>
  );
};

export default LoginForm;
