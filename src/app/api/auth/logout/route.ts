import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/auth/logout
 * Logout a user
 */
export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ success: true });

    // Clear user cookie
    response.cookies.set("user", "", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
