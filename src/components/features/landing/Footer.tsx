"use client";

import { useTranslations } from "next-intl";
import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 py-12 bg-muted/30 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center gap-6">
          <Logo className="scale-125" />
          <p className="text-sm text-muted-foreground max-w-md">{t("description")}</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              {t("links.about")}
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              {t("links.howItWorks")}
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              {t("links.privacyPolicy")}
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              {t("links.termsOfService")}
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              {t("links.contact")}
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
