"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { AxiosError } from "axios";
import axiosInstance from "@/lib/axios";
import type { User, UserRole } from "@/lib/types/user";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setRole: (role: UserRole) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from cookie on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const userCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("user="))
          ?.split("=")[1];

        if (userCookie) {
          const userData = JSON.parse(decodeURIComponent(userCookie));
          setUser(userData);
        }
      } catch (err) {
        console.error("Failed to initialize auth:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const setUserCookie = useCallback((userData: User | null) => {
    if (userData) {
      const cookieValue = encodeURIComponent(JSON.stringify(userData));
      document.cookie = `user=${cookieValue}; path=/; max-age=${60 * 60 * 24 * 7}`;
      setUser(userData);
    } else {
      document.cookie = "user=; path=/; max-age=0";
      setUser(null);
    }
  }, []);

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axiosInstance.post("/api/auth/register", {
          email,
          password,
          name,
        });
        setUserCookie(data.user);
      } catch (err) {
        const message =
          err instanceof AxiosError ? err.response?.data?.message || err.message : "Registration failed";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [setUserCookie]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axiosInstance.post("/api/auth/login", {
          email,
          password,
        });
        setUserCookie(data.user);
      } catch (err) {
        const message =
          err instanceof AxiosError ? err.response?.data?.message || err.message : "Login failed";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [setUserCookie]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await axiosInstance.post("/api/auth/logout");
      setUserCookie(null);
    } catch (err) {
      const message =
        err instanceof AxiosError ? err.response?.data?.message || err.message : "Logout failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setUserCookie]);

  const setRole = useCallback(
    async (role: UserRole) => {
      setIsLoading(true);
      setError(null);
      if (!user) {
        setError("No user authenticated");
        setIsLoading(false);
        throw new Error("No user authenticated");
      }

      try {
        const { data } = await axiosInstance.post("/api/auth/set-role", { role });
        setUserCookie({ ...user, role });
      } catch (err) {
        const message =
          err instanceof AxiosError ? err.response?.data?.message || err.message : "Failed to set role";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [user, setUserCookie]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    error,
    register,
    login,
    logout,
    setRole,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
