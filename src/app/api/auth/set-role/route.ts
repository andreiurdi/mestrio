import { NextRequest, NextResponse } from "next/server";
import type { UserRole } from "@/lib/types/user";

/**
 * POST /api/auth/set-role
 * Set user role after selection
 * TODO: Update database with user role
 */
export async function POST(request: NextRequest) {
  try {
    const { role } = await request.json();

    // Validation
    if (!role || !["client", "provider", "admin"].includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    // Get user from cookie
    const userCookie = request.cookies.get("user");
    if (!userCookie) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    try {
      const user = JSON.parse(userCookie.value);
      user.role = role;
      user.updatedAt = new Date();

      // TODO: Update user role in database

      const response = NextResponse.json({ user });

      // Update cookie with role
      response.cookies.set("user", JSON.stringify(user), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return response;
    } catch (error) {
      return NextResponse.json({ message: "Failed to parse user data" }, { status: 400 });
    }
  } catch (error) {
    console.error("Set role error:", error);
    return NextResponse.json({ message: "Failed to set role" }, { status: 500 });
  }
}
