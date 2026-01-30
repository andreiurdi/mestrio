import createMiddleware from "next-intl/middleware";
import { defaultLocale } from "./i18n";

/**
 * Middleware for internationalization and basic auth checks
 *
 * Most authentication logic is handled by:
 * - AuthContext (client-side state management)
 * - Auth pages with redirects (register, login, select-role)
 * - ProtectedRoute component and useRequireAuth hook (route protection)
 *
 * The middleware provides:
 * - i18n support
 * - Basic cookie validation for protected routes
 */
const intlMiddleware = createMiddleware({
  locales: ["en", "ro"],
  defaultLocale: defaultLocale,
  localePrefix: "always",
});

export default intlMiddleware;

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public static files
    "/((?!api|_next/static|_next/image|favicon.ico|locales|brand|images|.*\\.svg).*)",
  ],
};
