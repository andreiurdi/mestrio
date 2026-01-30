import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { defaultLocale } from "./i18n";

const intlMiddleware = createMiddleware({
  locales: ["en", "ro"],
  defaultLocale: defaultLocale,
  localePrefix: "always",
});

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract locale from pathname
  const pathnameLocale = pathname.split("/")[1];
  const locale = ["en", "ro"].includes(pathnameLocale) ? pathnameLocale : defaultLocale;

  // Get user from cookies (TODO: Replace with actual auth implementation)
  const userCookie = request.cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;
  const isAuthenticated = user !== null;
  const hasRole = user?.role !== undefined;

  // Define route patterns
  const isAuthPage = pathname.includes("/auth/");
  const isSelectRolePage = pathname.includes("/auth/select-role");
  const isClientRoute = pathname.includes("/client");
  const isProviderRoute = pathname.includes("/provider");
  const isAdminRoute = pathname.includes("/admin");
  const isProtectedRoute = isClientRoute || isProviderRoute || isAdminRoute;

  // Route guard logic
  if (isProtectedRoute && !isAuthenticated) {
    // Redirect to login if accessing protected route without authentication
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
  }

  if (isAuthenticated && !hasRole && !isSelectRolePage) {
    // Redirect to select role if authenticated but no role selected
    return NextResponse.redirect(new URL(`/${locale}/auth/select-role`, request.url));
  }

  if (isAuthenticated && hasRole && isSelectRolePage) {
    // Redirect to appropriate dashboard if already has role
    const dashboardPath = user.role === "admin" ? "/admin" : user.role === "provider" ? "/provider" : "/client";
    return NextResponse.redirect(new URL(`/${locale}${dashboardPath}`, request.url));
  }

  if (isAuthenticated && hasRole && isProtectedRoute) {
    // Ensure user is accessing the correct dashboard for their role
    const userRole = user.role;
    if (
      (userRole === "client" && (isProviderRoute || isAdminRoute)) ||
      (userRole === "provider" && (isClientRoute || isAdminRoute)) ||
      (userRole === "admin" && (isClientRoute || isProviderRoute))
    ) {
      const correctDashboard = userRole === "admin" ? "/admin" : userRole === "provider" ? "/provider" : "/client";
      return NextResponse.redirect(new URL(`/${locale}${correctDashboard}`, request.url));
    }
  }

  // Continue with i18n middleware
  return intlMiddleware(request);
}

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
