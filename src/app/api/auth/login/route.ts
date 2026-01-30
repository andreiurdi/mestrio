import { NextRequest, NextResponse } from "next/server";
import type { User } from "@/lib/types/user";

/**
 * POST /api/auth/login
 * Login a user
 * TODO: Implement actual login with database password verification
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json({ message: "Missing email or password" }, { status: 400 });
    }

    // TODO:
    // 1. Find user in database by email
    // 2. Verify password hash
    // 3. Generate session token
    // 4. Set secure httpOnly cookie

    // Placeholder: Mock user (replace with actual database query)
    const user: User = {
      id: `user_${email.replace(/[^a-z0-9]/g, "")}`,
      email,
      name: "John Doe", // TODO: Get from database
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      updatedAt: new Date(),
    };

    const response = NextResponse.json({ user });

    // Set cookie (this will be synced with client-side Context API)
    response.cookies.set("user", JSON.stringify(user), {
      httpOnly: false, // TODO: Set to true when using secure backend
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
