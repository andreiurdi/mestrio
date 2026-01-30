"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocialLoginButtons } from "@/features/auth/components/SocialLoginButtons";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login:", { email, password });
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        {/* Heading */}
        <div className="space-y-2">
          <h2 className="text-3xl font-medium text-foreground tracking-wide">Login to your account</h2>
          <p className="text-sm text-muted-foreground">Enter your email below to login to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-normal text-foreground">
              Email
            </label>
            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-11" />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-normal text-foreground">
                Password
              </label>
              <Link href="/auth/forgot-password" className="text-sm font-medium text-primary hover:underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-11" />
          </div>

          {/* Login Button */}
          <Button type="submit" size="lg" className="w-full h-12 text-base font-medium">
            Login
          </Button>
        </form>

        {/* Social Login */}
        <SocialLoginButtons />

        {/* Sign up link */}
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-medium text-primary underline hover:no-underline">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
