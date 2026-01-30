"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ro" : "en";
    const newPathname = pathname.replace(/^\/(en|ro)/, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="text-xs">
      {locale === "en" ? "RO" : "EN"}
    </Button>
  );
}
