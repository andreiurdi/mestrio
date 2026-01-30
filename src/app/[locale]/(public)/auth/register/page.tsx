"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, AuthLayout, SocialLoginButtons, registerSchema, type RegisterFormInputs } from "@/features/auth";
import { Button, Input } from "@/components";
import { FormFieldError } from "@/components/auth";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const router = useRouter();
  const { register: authRegister, error: authError, clearError, isAuthenticated, user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      router.push("/client"); // Redirect to appropriate dashboard
    } else if (isAuthenticated && !user?.role) {
      router.push("/auth/select-role");
    }
  }, [isAuthenticated, user, router]);

  // Display auth error in form
  useEffect(() => {
    if (authError) {
      setError("root", { message: authError });
      clearError();
    }
  }, [authError, setError, clearError]);

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await authRegister(data.email, data.password, data.name);
      // Middleware will handle redirect to select-role
      router.push("/auth/select-role");
      router.refresh();
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Root Error */}
          {errors.root && <FormFieldError message={errors.root.message} />}

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
          <Button type="submit" size="lg" className="w-full h-12 text-base font-medium" disabled={isSubmitting || isAuthenticated}>
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
