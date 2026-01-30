"use server";

import { cookies } from "next/headers";
import type { UserRole } from "@/lib/types/user";

/**
 * Set user role after selection
 * TODO: Update to use actual database and auth provider
 */
export async function setUserRole(role: UserRole) {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user");
    
    if (!userCookie) {
      throw new Error("User not authenticated");
    }
    
    const user = JSON.parse(userCookie.value);
    user.role = role;
    user.updatedAt = new Date();
    
    // Update the user cookie with the new role
    cookieStore.set("user", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error setting user role:", error);
    return { success: false, error: "Failed to set user role" };
  }
}
