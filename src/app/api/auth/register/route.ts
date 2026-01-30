import { NextRequest, NextResponse } from "next/server";
import type { User } from "@/lib/types/user";

/**
 * POST /api/auth/register
 * Register a new user
 * TODO: Implement actual registration with database and password hashing
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 });
    }

    // TODO: 
    // 1. Check if user already exists in database
    // 2. Hash password securely
    // 3. Save user to database
    // 4. Generate session token
    // 5. Set secure httpOnly cookie

    // Placeholder: Create user object
    const user: User = {
      id: `user_${Date.now()}`,
      email,
      name,
      createdAt: new Date(),
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
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Registration failed" }, { status: 500 });
  }
}
