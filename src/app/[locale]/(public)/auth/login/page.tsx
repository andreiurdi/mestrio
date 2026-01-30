"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, AuthLayout, SocialLoginButtons, loginSchema, type LoginFormInputs } from "@/features/auth";
import { Button, Input } from "@/components";
import { FormFieldError } from "@/components/auth/FormFieldError";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const router = useRouter();
  const { login: authLogin, error: authError, clearError, isAuthenticated, user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
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

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await authLogin(data.email, data.password);
      // Middleware will handle redirect appropriately
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-normal text-foreground">
                {t("password")}
              </label>
              <Link href="/auth/forgot-password" className="text-sm font-medium text-primary hover:underline">
                {t("forgotPassword")}
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className={`h-11 ${errors.password ? "border-destructive" : ""}`}
              aria-invalid={errors.password ? "true" : "false"}
            />
            <FormFieldError message={errors.password?.message} />
          </div>

          {/* Login Button */}
          <Button type="submit" size="lg" className="w-full h-12 text-base font-medium" disabled={isSubmitting || isAuthenticated}>
            {isSubmitting ? "Loading..." : t("submit")}
          </Button>
        </form>

        {/* Social Login */}
        <SocialLoginButtons />

        {/* Sign up link */}
        <p className="text-center text-sm text-muted-foreground">
          {t("noAccount")}{" "}
          <Link href="/auth/register" className="font-medium text-primary underline hover:no-underline">
            {t("signUp")}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
