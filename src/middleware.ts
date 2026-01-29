import createMiddleware from "next-intl/middleware";
import { defaultLocale } from "./i18n";

export default createMiddleware({
  locales: ["en", "ro"],
  defaultLocale: defaultLocale,
  localePrefix: "always",
});

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
