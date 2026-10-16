import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // TODO: Implement get current user profile
  return NextResponse.json({ message: "Get user profile route" });
}
