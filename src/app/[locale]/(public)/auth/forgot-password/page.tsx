"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormFieldError } from "@/components/auth/FormFieldError";
import { forgotPasswordSchema, type ForgotPasswordFormInputs } from "@/lib/auth-schemas";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth.forgotPassword");
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const email = watch("email");

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    try {
      // TODO: Implement actual forgot password logic
      console.log("Forgot password:", data);
      setSubmittedEmail(data.email);
      setSubmitted(true);
    } catch (error) {
      console.error("Forgot password error:", error);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        {/* Heading */}
        <div className="space-y-2">
          <h2 className="text-3xl font-medium text-foreground tracking-wide">{submitted ? t("checkEmail") : t("title")}</h2>
          <p className="text-sm text-muted-foreground">{submitted ? t("checkEmailDescription") : t("description")}</p>
        </div>

        {!submitted ? (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-normal text-foreground">
                  {t("email")}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  {...register("email")}
                  className={`h-11 ${errors.email ? "border-destructive" : ""}`}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                <FormFieldError message={errors.email?.message} />
              </div>

              {/* Submit Button */}
              <Button type="submit" size="lg" className="w-full h-12 text-base font-medium" disabled={isSubmitting}>
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
              <p className="text-sm text-foreground">{t("checkEmailDescription")}</p>
            </div>

            {/* Back to login button */}
            <Link href="/auth/login" className="block">
              <Button size="lg" className="w-full h-12 text-base font-medium">
                {t("backToLogin")}
              </Button>
            </Link>

            {/* Resend link */}
            <p className="text-center text-sm text-muted-foreground">
              {t("didNotReceive")}{" "}
              <button onClick={() => setSubmitted(false)} className="font-medium text-primary hover:underline">
                {t("tryAgain")}
              </button>
            </p>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
