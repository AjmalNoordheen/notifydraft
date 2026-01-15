"use client";
import { z } from "zod";
import { Card, CardContent, CardHeader } from "../elements/Card";
import { FileIcon } from "../icons/FileIcon";
import { FormEvent, useState } from "react";
import { showToast } from "nextjs-toast-notify";
import { useRouter } from "next/navigation";
import { AuthTab } from "./components/AuthTab";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import bcrypt from "bcryptjs";
import { DocLogo } from "../elements/DocLogo";

const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  email: z.email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  centerName: z.string().min(2, 'Center name must be at least 2 characters'),
  secret_key: z.string().min(6, 'Secret key must be at least 6 characters'),
});

const LoginContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);

  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    console.log("clicked");
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("login-email") as string;
    const password = formData.get("login-password") as string;

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      showToast.error(result.error.issues[0].message, {
        duration: 2000,
        progress: false,
        position: "bottom-right",
        transition: "swingInverted",
        icon: "",
        sound: true,
      });
      setIsLoading(false);
      e.currentTarget.reset();
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast.error(data.message, { duration: 2000 });
        setIsLoading(false);
        return;
      }
       router.push("/dashbord");
      showToast.success("Login successful 🎉");
      e.currentTarget?.reset();

     
    } catch (error) {
      showToast.error("Something went wrong", { duration: 2000 });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("signup-email") as string;
    const password = formData.get("signup-password") as string; 
    const centerName = formData.get("center-name") as string;
    const secret_key = formData.get("secret-key") as string;  

    setIsLoading(true);
    const result = signupSchema.safeParse({ 
      email: email, 
      password: password,
      centerName: centerName,
      secret_key: secret_key,
    });
    if (!result.success) {
      showToast.error(result.error.issues[0].message, {
        duration: 2000,
        progress: false,
        position: "bottom-right",
        transition: "swingInverted",
        icon: "",
        sound: true,
      });
      return;
    }

    try {
     

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, centerName, secret_key }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast.error(data.message, { duration: 2000 });
        setIsLoading(false);
        return;
      }
      showToast.success("Account created successfully 🎉");

      e.currentTarget?.reset();

      router.push("/dashbord");
    } catch (error) {
      showToast.error("Something went wrong", { duration: 2000 });
      console.log(error)
    }finally{
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <DocLogo />
          <h1 className="text-2xl font-semibold text-foreground mt-4">DocuTrack</h1>
          <p className="text-muted-foreground mt-1">
            Document Expiry Management for UAE Typing Centers
          </p>
        </div>
        <Card className="border-border shadow-2xl">
          <CardHeader className="pb-4">
            <AuthTab setShowSignIn={setShowSignIn} showSignIn={showSignIn} />
          </CardHeader>
          <CardContent>
            {showSignIn ? (
              <LoginForm handleLogin={handleLogin} isLoading={isLoading} />
            ) : (
              <SignUpForm handleSignup={handleSignup} isLoading={isLoading} />
            )}
          </CardContent>
        </Card>
        <div className="flex items-center justify-center gap-x-1 mt-6 text-sm text-muted-foreground">
         <span className="animate-spin">🌀​</span><span>Your data is secure and encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
