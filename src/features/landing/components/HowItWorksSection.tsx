"use client";

import { useTranslations } from "next-intl";
import { Search, MessageSquare, CheckCircle } from "lucide-react";

export function HowItWorksSection() {
  const t = useTranslations("howItWorks");

  const steps = [
    {
      icon: Search,
      key: "search",
    },
    {
      icon: MessageSquare,
      key: "connect",
    },
    {
      icon: CheckCircle,
      key: "hire",
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t("title")}</h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center relative">
                {index < steps.length - 1 && <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-border" />}
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6 relative z-10 shadow-lg">
                  <Icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground font-bold mb-4 text-sm">{index + 1}</div>
                <h3 className="text-xl font-semibold mb-3">{t(`steps.${step.key}.title`)}</h3>
                <p className="text-muted-foreground">{t(`steps.${step.key}.description`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
