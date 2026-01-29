import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/features/landing/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("header");

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
      {children}
    </div>
  );
}
