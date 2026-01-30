"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormFieldError } from "@/components/auth/FormFieldError";
import { resetPasswordSchema, type ResetPasswordFormInputs } from "@/lib/auth-schemas";

export default function ResetPasswordPage() {
  const t = useTranslations("auth.resetPassword");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted, router]);

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    try {
      // TODO: Implement actual reset password logic
      console.log("Reset password:", { token, ...data });
      setSubmitted(true);
    } catch (error) {
      console.error("Reset password error:", error);
    }
  };

  if (!token) {
    return (
      <AuthLayout>
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-medium text-foreground tracking-wide">
              {t("invalidLink")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("invalidLinkDescription")}
            </p>
          </div>

          <Link href="/auth/forgot-password" className="block">
            <Button size="lg" className="w-full h-12 text-base font-medium">
              {t("requestNewLink")}
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
            {submitted ? t("success") : t("title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {submitted ? t("successDescription") : t("description")}
          </p>
        </div>

        {!submitted ? (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-normal text-foreground">
                  {t("newPassword")}
                </label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={`h-11 ${errors.password ? "border-destructive" : ""}`}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {!errors.password && (
                  <p className="text-xs text-muted-foreground">{t("passwordHint")}</p>
                )}
                <FormFieldError message={errors.password?.message} />
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-normal text-foreground">
                  {t("confirmPassword")}
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className={`h-11 ${errors.confirmPassword ? "border-destructive" : ""}`}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
                <FormFieldError message={errors.confirmPassword?.message} />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-base font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : t("submit")}
              </Button>
            </form>

            {/* Back to login link */}
            <p className="text-center text-sm text-muted-foreground">
              <Link href="/auth/login" className="font-medium text-primary hover:underline">
                {t("backToLogin")}
              </Link>
            </p>
          </>
        ) : (
          <div className="space-y-6">
            {/* Success message */}
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <p className="text-sm text-foreground">
                {/* Using a simple message since translation key might not be available */}
                You can now use your new password to log in to your account.
              </p>
            </div>

            {/* Login button */}
            <Link href="/auth/login" className="block">
              <Button size="lg" className="w-full h-12 text-base font-medium">
                {t("continueToLogin")}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
