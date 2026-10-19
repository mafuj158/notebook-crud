import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/lib/jwt";
import httpStatus from "http-status";

const ACCESS_TOKEN_NAME =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "access_token";
const ACCESS_TOKEN_MAX_AGE = Number(
  process.env.ACCESS_TOKEN_MAX_AGE || 86400
);

const REFRESH_TOKEN_NAME =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || "refresh_token";
const REFRESH_TOKEN_MAX_AGE = Number(
  process.env.REFRESH_TOKEN_MAX_AGE || 604800
);

export async function POST(request: NextRequest) {
  try {
    // ১. রিফ্রেশ টোকেন রিড করা (কুকি, বডি অথবা হেডার থেকে)
    let refreshToken = request.cookies.get(REFRESH_TOKEN_NAME)?.value;

    if (!refreshToken) {
      // মোবাইল ক্লায়েন্টের জন্য বডি বা হেডার চেক
      const body = await request.json().catch(() => null);
      refreshToken =
        body?.refreshToken ||
        request.headers.get("x-refresh-token") ||
        undefined;
    }

    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Refresh token is missing",
          status: httpStatus.UNAUTHORIZED,
        },
        { status: httpStatus.UNAUTHORIZED }
      );
    }

    // ২. রিফ্রেশ টোকেন ভেরিফাই করা
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      const response = NextResponse.json(
        {
          success: false,
          message: "Invalid or expired refresh token",
          status: httpStatus.UNAUTHORIZED,
        },
        { status: httpStatus.UNAUTHORIZED }
      );
      // মেয়াদ শেষ হয়ে গেলে ইনভ্যালিড কুকি মুছে ফেলা
      response.cookies.delete(ACCESS_TOKEN_NAME);
      response.cookies.delete(REFRESH_TOKEN_NAME);
      return response;
    }

    // ৩. ডাটাবেসে ইউজার যাচাই করা
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true },
    });

    if (!user) {
      const response = NextResponse.json(
        {
          success: false,
          message: "User no longer exists",
          status: httpStatus.UNAUTHORIZED,
        },
        { status: httpStatus.UNAUTHORIZED }
      );
      response.cookies.delete(ACCESS_TOKEN_NAME);
      response.cookies.delete(REFRESH_TOKEN_NAME);
      return response;
    }

    // ৪. নতুন Access Token ও rotated Refresh Token তৈরি করা
    const tokenPayload = { userId: user.id, email: user.email };
    const newAccessToken = generateAccessToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    // ৫. রেসপন্স তৈরি করা
    const response = NextResponse.json(
      {
        success: true,
        message: "Token refreshed successfully",
        data: {
          tokens: {
            access_token: newAccessToken,
            refresh_token: newRefreshToken,
          },
        },
        status: httpStatus.OK,
      },
      { status: httpStatus.OK }
    );

    // ৬. ব্রাউজারের জন্য নতুন httpOnly কুকি সেট করা
    response.cookies.set(ACCESS_TOKEN_NAME, newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    response.cookies.set(REFRESH_TOKEN_NAME, newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to refresh token",
        status: httpStatus.INTERNAL_SERVER_ERROR,
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
