"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocialLoginButtons } from "@/features/auth/components/SocialLoginButtons";
import { FormFieldError } from "@/components/auth/FormFieldError";
import { loginSchema, type LoginFormInputs } from "@/lib/auth-schemas";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      // TODO: Implement actual login logic
      console.log("Login:", data);
      // router.push("/dashboard");
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
          <Button type="submit" size="lg" className="w-full h-12 text-base font-medium" disabled={isSubmitting}>
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
