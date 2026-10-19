import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/jwt";
import httpStatus from "http-status";

const ACCESS_TOKEN_NAME =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "access_token";

export async function GET(request: NextRequest) {
  try {
    // ১. কুকি অথবা Authorization হেডার থেকে Access Token রিড করা
    let token = request.cookies.get(ACCESS_TOKEN_NAME)?.value;

    if (!token) {
      const authHeader = request.headers.get("authorization");
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    // ২. কোনো টোকেন না থাকলে সরাসরি ৪০১
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Access token is missing",
          status: httpStatus.UNAUTHORIZED,
        },
        { status: httpStatus.UNAUTHORIZED }
      );
    }

    // ৩. টোকেন ভেরিফাই করা
    let payload;
    try {
      payload = verifyAccessToken(token);
      console.log("payload", payload);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired access token",
          status: httpStatus.UNAUTHORIZED,
        },
        { status: httpStatus.UNAUTHORIZED }
      );
    }

    // ৪. ডাটাবেসে ইউজার সার্চ করা (পাসওয়ার্ড ছাড়া)
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // ৫. যদি ইউজার না পাওয়া যায় তবে ৪০৪
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
          status: httpStatus.NOT_FOUND,
        },
        { status: httpStatus.NOT_FOUND }
      );
    }

    // ৬. রেসপন্স তৈরি করা
    return NextResponse.json(
      {
        success: true,
        message: "User profile fetched successfully",
        data: { user },
        status: httpStatus.OK,
      },
      { status: httpStatus.OK }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user",
        status: httpStatus.INTERNAL_SERVER_ERROR,
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
