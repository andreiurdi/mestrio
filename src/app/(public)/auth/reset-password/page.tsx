"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords don't match");
      return;
    }

    // TODO: Implement reset password logic
    console.log("Reset password:", { token, password });
    setSubmitted(true);

    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  };

  if (!token) {
    return (
      <AuthLayout>
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-medium text-foreground tracking-wide">
              Invalid reset link
            </h2>
            <p className="text-sm text-muted-foreground">
              This password reset link is invalid or has expired.
            </p>
          </div>

          <Link href="/auth/forgot-password" className="block">
            <Button size="lg" className="w-full h-12 text-base font-medium">
              Request new link
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="space-y-8">
        {/* Heading */}
        <div className="space-y-2">
          <h2 className="text-3xl font-medium text-foreground tracking-wide">
            {submitted ? "Password reset successful" : "Reset your password"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {submitted
              ? "Your password has been successfully reset. Redirecting to login..."
              : "Enter your new password below"}
          </p>
        </div>

        {!submitted ? (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-normal text-foreground"
                >
                  New Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                  minLength={8}
                />
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters
                </p>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-normal text-foreground"
                >
                  Confirm New Password
                </label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-11"
                  minLength={8}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-base font-medium"
              >
                Reset password
              </Button>
            </form>

            {/* Back to login link */}
            <p className="text-center text-sm text-muted-foreground">
              <Link
                href="/auth/login"
                className="font-medium text-primary hover:underline"
              >
                Back to login
              </Link>
            </p>
          </>
        ) : (
          <div className="space-y-6">
            {/* Success message */}
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <p className="text-sm text-foreground">
                You can now use your new password to log in to your account.
              </p>
            </div>

            {/* Login button */}
            <Link href="/auth/login" className="block">
              <Button size="lg" className="w-full h-12 text-base font-medium">
                Continue to login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
