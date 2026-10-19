import { NextResponse } from "next/server";

const ACCESS_TOKEN_NAME =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "access_token";
const REFRESH_TOKEN_NAME =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || "refresh_token";

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: "Logged out successfully" },
    { status: 200 }
  );

  // Clear httpOnly authentication cookies
  response.cookies.delete(ACCESS_TOKEN_NAME);
  response.cookies.delete(REFRESH_TOKEN_NAME);

  return response;
}
