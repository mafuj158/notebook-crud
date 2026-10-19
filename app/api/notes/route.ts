import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // TODO: Implement get notes list
  return NextResponse.json({ message: "Get notes route" });
}

export async function POST(request: NextRequest) {
  // TODO: Implement create note
  return NextResponse.json({ message: "Create note route" });
}
