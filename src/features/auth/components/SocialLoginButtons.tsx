"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function SocialLoginButtons() {
  const t = useTranslations("auth");

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log("Google login");
  };

  const handleFacebookLogin = () => {
    // TODO: Implement Facebook OAuth
    console.log("Facebook login");
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-4 text-muted-foreground">
            {/* Using a generic text since different pages might have different keys */}
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="outline" onClick={handleGoogleLogin} className="w-full">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.8 10.2083C18.8 9.55831 18.7417 8.93331 18.6333 8.33331H10V11.8833H14.9333C14.7167 13.025 14.0667 13.9916 13.0917 14.6416V16.95H16.0667C17.8 15.35 18.8 13 18.8 10.2083Z"
              fill="#4285F4"
            />
            <path
              d="M10 19.1667C12.475 19.1667 14.55 18.35 16.0667 16.95L13.0917 14.6417C12.275 15.1917 11.2333 15.525 10 15.525C7.61668 15.525 5.59168 13.9167 4.86668 11.75H1.81668V14.1167C3.32501 17.1083 6.41668 19.1667 10 19.1667Z"
              fill="#34A853"
            />
            <path
              d="M4.86668 11.7417C4.68334 11.1917 4.57501 10.6083 4.57501 10C4.57501 9.39166 4.68334 8.80833 4.86668 8.25833V5.89166H1.81668C1.19168 7.125 0.833344 8.51666 0.833344 10C0.833344 11.4833 1.19168 12.875 1.81668 14.1083L4.19168 12.2583L4.86668 11.7417Z"
              fill="#FBBC05"
            />
            <path
              d="M10 4.48331C11.35 4.48331 12.55 4.94998 13.5083 5.84998L16.1333 3.22498C14.5417 1.74165 12.475 0.833313 10 0.833313C6.41668 0.833313 3.32501 2.89165 1.81668 5.89165L4.86668 8.25831C5.59168 6.09165 7.61668 4.48331 10 4.48331Z"
              fill="#EA4335"
            />
          </svg>
          {t("social.google")}
        </Button>

        <Button type="button" variant="outline" onClick={handleFacebookLogin} className="w-full">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_104_337)">
              <path
                d="M20 10.0609C20 4.53835 15.5225 0.0608521 10 0.0608521C4.4775 0.0608521 0 4.53835 0 10.0609C0 15.0525 3.65667 19.1892 8.4375 19.9392V12.9517H5.89833V10.06H8.4375V7.85835C8.4375 5.35252 9.93083 3.96752 12.215 3.96752C13.3083 3.96752 14.4533 4.16335 14.4533 4.16335V6.62419H13.1917C11.9492 6.62419 11.5617 7.39502 11.5617 8.18585V10.0609H14.335L13.8917 12.9525H11.5617V19.94C16.3433 19.1892 20 15.0517 20 10.0609Z"
                fill="#1877F2"
              />
            </g>
            <defs>
              <clipPath id="clip0_104_337">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {t("social.facebook")}
        </Button>
      </div>
    </div>
  );
}
