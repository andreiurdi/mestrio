"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement forgot password logic
    console.log("Forgot password:", { email });
    setSubmitted(true);
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        {/* Heading */}
        <div className="space-y-2">
          <h2 className="text-3xl font-medium text-foreground tracking-wide">{submitted ? "Check your email" : "Forgot your password?"}</h2>
          <p className="text-sm text-muted-foreground">
            {submitted ? "We've sent you a password reset link to your email address" : "Enter your email address and we'll send you a link to reset your password"}
          </p>
        </div>

        {!submitted ? (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-normal text-foreground">
                  Email
                </label>
                <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-11" />
              </div>

              {/* Submit Button */}
              <Button type="submit" size="lg" className="w-full h-12 text-base font-medium">
                Send reset link
              </Button>
            </form>

            {/* Back to login link */}
            <p className="text-center text-sm text-muted-foreground">
              <Link href="/auth/login" className="font-medium text-primary hover:underline">
                Back to login
              </Link>
            </p>
          </>
        ) : (
          <div className="space-y-6">
            {/* Success message */}
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <p className="text-sm text-foreground">
                If an account exists with the email <span className="font-medium">{email}</span>, you will receive a password reset link shortly.
              </p>
            </div>

            {/* Back to login button */}
            <Link href="/auth/login" className="block">
              <Button size="lg" className="w-full h-12 text-base font-medium">
                Back to login
              </Button>
            </Link>

            {/* Resend link */}
            <p className="text-center text-sm text-muted-foreground">
              Didn&apos;t receive the email?{" "}
              <button onClick={() => setSubmitted(false)} className="font-medium text-primary hover:underline">
                Try again
              </button>
            </p>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
