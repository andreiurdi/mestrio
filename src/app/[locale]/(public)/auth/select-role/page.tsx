"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { setUserRole } from "@/lib/actions/auth";
import type { UserRole } from "@/lib/types/user";

export default function SelectRolePage() {
  const t = useTranslations("auth.selectRole");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelection = async (role: UserRole) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      // Update user role in the database/session
      const result = await setUserRole(role);

      if (result.success) {
        // Redirect to appropriate dashboard
        if (role === "client") {
          router.push("/client");
        } else if (role === "provider") {
          router.push("/provider");
        } else {
          router.push("/admin");
        }
        router.refresh();
      } else {
        console.error("Failed to set role:", result.error);
      }
    } catch (error) {
      console.error("Role selection error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        {/* Heading */}
        <div className="space-y-2">
          <h2 className="text-3xl font-medium text-foreground tracking-wide">Mestrio</h2>
        </div>

        {/* Role Cards */}
        <div className="space-y-4">
          {/* Client Role Card */}
          <Card className="border-2 hover:border-primary transition-colors cursor-pointer group">
            <button onClick={() => handleRoleSelection("client")} className="w-full p-6 text-left" type="button">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{t("title")}</h3>
                <p className="text-sm text-muted-foreground">{t("description")}</p>
                <div className="pt-2">
                  <Button
                    type="button"
                    size="lg"
                    className="w-full h-12 text-base font-medium"
                    disabled={isLoading}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRoleSelection("client");
                    }}
                  >
                    {isLoading ? "Loading..." : t("submitClient")}
                  </Button>
                </div>
              </div>
            </button>
          </Card>

          {/* Provider Role Card */}
          <Card className="border-2 hover:border-primary transition-colors cursor-pointer group">
            <button onClick={() => handleRoleSelection("provider")} className="w-full p-6 text-left" type="button">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{t("titleProvider")}</h3>
                <p className="text-sm text-muted-foreground">{t("descriptionProvider")}</p>
                <div className="pt-2">
                  <Button
                    type="button"
                    size="lg"
                    className="w-full h-12 text-base font-medium"
                    disabled={isLoading}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRoleSelection("provider");
                    }}
                  >
                    {isLoading ? "Loading..." : t("submitProvider")}
                  </Button>
                </div>
              </div>
            </button>
          </Card>
        </div>
      </div>
    </AuthLayout>
  );
}
