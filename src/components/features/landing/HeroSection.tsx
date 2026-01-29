"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { Logo } from "./Logo";

export function HeroSection() {
  const t = useTranslations("hero");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
  };

  return (
    <section className="px-6 py-16 md:py-24 flex flex-col items-center justify-center text-center bg-gradient-to-b from-primary/5 to-background">
      <Logo variant="vertical" showTagline className="mb-8" />

      <Badge variant="outline" className="mb-6 border-primary/20 text-primary">
        {t("tagline")}
      </Badge>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl">{t("title")}</h1>

      <p className="text-muted-foreground mb-8 max-w-2xl text-lg md:text-xl">{t("description")}</p>

      <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="w-5 h-5 text-secondary" />
          <span>{t("features.verified")}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="w-5 h-5 text-secondary" />
          <span>{t("features.reviews")}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="w-5 h-5 text-secondary" />
          <span>{t("features.messaging")}</span>
        </div>
      </div>

      <form onSubmit={handleSearch} className="w-full max-w-3xl bg-card border border-border rounded-xl p-6 md:p-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="service-type" className="text-sm font-medium text-left">
              {t("form.serviceLabel")}
            </label>
            <Input id="service-type" placeholder={t("form.servicePlaceholder")} type="text" className="h-11" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="location" className="text-sm font-medium text-left">
              {t("form.locationLabel")}
            </label>
            <Input id="location" placeholder={t("form.locationPlaceholder")} type="text" className="h-11" />
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full">
          {t("form.submit")}
        </Button>
      </form>
    </section>
  );
}
