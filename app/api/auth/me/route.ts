import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/jwt";

const ACCESS_TOKEN_NAME =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "access_token";

export async function GET(request: NextRequest) {
  try {
    // ১. কুকি থেকে Access Token রিড করা
    let tokenCookie = request.cookies.get(ACCESS_TOKEN_NAME);

    // ২. কোনো টোকেন না থাকলে সরাসরি ৪০১
    if (!tokenCookie) {
      return NextResponse.json(
        { success: false, message: "Access token is missing", status: 401 },
        { status: 401 }
      );
    }

    // ৩. টোকেন ভেরিফাই করা
    

    // ৩. ডাটাবেসে ইউজার সার্চ করা ( পাসওয়ার্ড ছাড়া ) ✅
    

    // ৪. যদি ইউজার না পাওয়া যায় তবে সরাসরি ৪০১


    // ৫. রেসপন্স তৈরি করা ✅
    
  
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch user", status: 500 },
      { status: 500 }
    );
  }
}
