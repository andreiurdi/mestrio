"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Logo } from "@/features/landing/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function PublicHeader() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const isAuthPage = pathname?.includes("/auth");

  if (isAuthPage) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6">
      <Logo />
      <nav className="flex items-center gap-3">
        <LanguageSwitcher />
        <Link href="/auth/login">
          <Button variant="ghost">{t("signIn")}</Button>
        </Link>
        <Link href="/auth/register">
          <Button>{t("getStarted")}</Button>
        </Link>
      </nav>
    </header>
  );
}
