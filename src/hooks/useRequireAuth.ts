"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context/AuthContext";
import type { UserRole } from "@/lib/types/user";

interface UseRequireAuthOptions {
  requiredRole?: UserRole | UserRole[];
  redirectTo?: string;
}

/**
 * Custom hook that protects routes and optionally checks user role
 * Redirects to login if not authenticated or to a custom path if role doesn't match
 *
 * Usage:
 * useRequireAuth({ requiredRole: 'client' })
 * useRequireAuth({ requiredRole: ['client', 'provider'] })
 */
export function useRequireAuth(options?: UseRequireAuthOptions) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();
  const { requiredRole, redirectTo } = options || {};

  useEffect(() => {
    if (isLoading) return;

    // Check authentication
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    // Check role selection
    if (!user?.role) {
      router.push("/auth/select-role");
      return;
    }

    // Check role permissions if specified
    if (requiredRole) {
      const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
      if (!allowedRoles.includes(user.role)) {
        const finalRedirectPath = redirectTo || (user.role === "admin" ? "/admin" : user.role === "provider" ? "/provider" : "/client");
        router.push(finalRedirectPath);
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRole, redirectTo, router]);

  return {
    isLoading,
    isAuthenticated,
    user,
    hasRequiredRole: !requiredRole || (user?.role && (Array.isArray(requiredRole) ? requiredRole.includes(user.role) : requiredRole === user.role)),
  };
}
