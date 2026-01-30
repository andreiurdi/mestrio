"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context/AuthContext";
import type { UserRole } from "@/lib/types/user";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
  fallback?: React.ReactNode;
}

/**
 * Wrapper component that protects routes based on authentication and role
 * Usage: <ProtectedRoute requiredRole="client">{children}</ProtectedRoute>
 */
export function ProtectedRoute({ children, requiredRole, fallback }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated - redirect to login
      if (!isAuthenticated) {
        router.push("/auth/login");
        return;
      }

      // No role selected - redirect to select role
      if (!user?.role) {
        router.push("/auth/select-role");
        return;
      }

      // Check role permissions if specified
      if (requiredRole) {
        const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        if (!allowedRoles.includes(user.role)) {
          // User doesn't have required role - redirect to their dashboard
          const dashboardPath = user.role === "admin" ? "/admin" : user.role === "provider" ? "/provider" : "/client";
          router.push(dashboardPath);
          return;
        }
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRole, router]);

  // Show fallback while loading
  if (isLoading) {
    return fallback || <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Don't render if not authenticated or loading
  if (!isAuthenticated || !user?.role) {
    return null;
  }

  // Check role permission
  if (requiredRole) {
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!allowedRoles.includes(user.role)) {
      return null;
    }
  }

  return <>{children}</>;
}
