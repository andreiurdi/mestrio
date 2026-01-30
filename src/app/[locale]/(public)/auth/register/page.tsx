"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocialLoginButtons } from "@/features/auth/components/SocialLoginButtons";
import { FormFieldError } from "@/components/auth/FormFieldError";
import { registerSchema, type RegisterFormInputs } from "@/lib/auth-schemas";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      // TODO: Implement actual registration logic
      console.log("Register:", data);
      // router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        {/* Heading */}
        <div className="space-y-2">
          <h2 className="text-3xl font-medium text-foreground tracking-wide">{t("title")}</h2>
          <p className="text-sm text-muted-foreground">{t("description")}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-normal text-foreground">
              {t("fullName")}
            </label>
            <Input
              id="name"
              type="text"
              placeholder={t("fullNamePlaceholder")}
              {...register("name")}
              className={`h-11 ${errors.name ? "border-destructive" : ""}`}
              aria-invalid={errors.name ? "true" : "false"}
            />
            <FormFieldError message={errors.name?.message} />
          </div>

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

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-normal text-foreground">
              {t("password")}
            </label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className={`h-11 ${errors.password ? "border-destructive" : ""}`}
              aria-invalid={errors.password ? "true" : "false"}
            />
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

          {/* Sign Up Button */}
          <Button type="submit" size="lg" className="w-full h-12 text-base font-medium" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : t("submit")}
          </Button>
        </form>

        {/* Social Login */}
        <SocialLoginButtons />

        {/* Login link */}
        <p className="text-center text-sm text-muted-foreground">
          {t("hasAccount")}{" "}
          <Link href="/auth/login" className="font-medium text-primary underline hover:no-underline">
            {t("signIn")}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
