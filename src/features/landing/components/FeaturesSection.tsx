"use client";

import { useTranslations } from "next-intl";
import { Shield, Star, MapPin, Clock, DollarSign, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const featureKeys = ["verified", "reviews", "local", "response", "pricing", "communication"];
const featureIcons = [Shield, Star, MapPin, Clock, DollarSign, Users];

export function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <section className="px-6 py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t("title")}</h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureKeys.map((key, index) => {
            const Icon = featureIcons[index];
            return (
              <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t(`items.${key}.title`)}</h3>
                  <p className="text-muted-foreground text-sm">{t(`items.${key}.description`)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
