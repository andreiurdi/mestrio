"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocialLoginButtons } from "@/features/auth/components/SocialLoginButtons";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
    if (password !== confirmPassword) {
      console.error("Passwords don't match");
      return;
    }
    console.log("Register:", { name, email, password });
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        {/* Heading */}
        <div className="space-y-2">
          <h2 className="text-3xl font-medium text-foreground tracking-wide">Create an account</h2>
          <p className="text-sm text-muted-foreground">Enter your information to create your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-normal text-foreground">
              Full Name
            </label>
            <Input id="name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required className="h-11" />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-normal text-foreground">
              Email
            </label>
            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-11" />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-normal text-foreground">
              Password
            </label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-11" minLength={8} />
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label htmlFor="confirm-password" className="text-sm font-normal text-foreground">
              Confirm Password
            </label>
            <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="h-11" minLength={8} />
          </div>

          {/* Sign Up Button */}
          <Button type="submit" size="lg" className="w-full h-12 text-base font-medium">
            Sign up
          </Button>
        </form>

        {/* Social Login */}
        <SocialLoginButtons />

        {/* Login link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-primary underline hover:no-underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
