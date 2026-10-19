import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { LoginPayload, ValidationErrorItem } from "@/types";
import httpStatus from "http-status";

// Access Token এর জন্য 
const ACCESS_TOKEN_NAME =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "access_token";
const ACCESS_TOKEN_MAX_AGE = Number(
  process.env.ACCESS_TOKEN_MAX_AGE || 86400
);

// Refresh Token এর জন্য
const REFRESH_TOKEN_NAME =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || "refresh_token";
const REFRESH_TOKEN_MAX_AGE = Number(
  process.env.REFRESH_TOKEN_MAX_AGE || 604800
);

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as LoginPayload | null;
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request payload",
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    const { email, password } = body;

    // ১. সব ভ্যালিডেশন এরর Array হিসেবে কালেক্ট করা
    const errors: ValidationErrorItem[] = [];

    // Email Validation (Presence, Type & Format check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === undefined || email === null || email === "") {
      errors.push({ field: "email", message: "Email is required" });
    } else if (typeof email !== "string") {
      errors.push({ field: "email", message: "Email must be a string" });
    } else if (!emailRegex.test(email.trim())) {
      errors.push({ field: "email", message: "Please provide a valid email address" });
    }

    // Password Validation (Presence, Type & Length check)
    if (password === undefined || password === null || password === "") {
      errors.push({ field: "password", message: "Password is required" });
    } else if (typeof password !== "string") {
      errors.push({ field: "password", message: "Password must be a string" });
    }

    // ২. কোনো এরর থাকলে 400 রিটার্ন করা
    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors,
          status: httpStatus.BAD_REQUEST,
        },
        { status: httpStatus.BAD_REQUEST }
      );
    }

    // ৩. ডাটাবেসে ইউজার আছে কি না যাচাই
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
          errors,
          status: httpStatus.UNAUTHORIZED,
        },
        { status: httpStatus.UNAUTHORIZED }
      );
    }

    // ৪. পাসওয়ার্ড যাচাই
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
          errors,
          status: httpStatus.UNAUTHORIZED,
        },
        { status: httpStatus.UNAUTHORIZED }
      );
    }

    // ৫. টোকেন তৈরি করা
    const tokenPayload = {
      userId: user.id,
      email: user.email,
    };
    const access_token = generateAccessToken(tokenPayload);
    const refresh_token = generateRefreshToken(tokenPayload);

    // ৬. Response তৈরি (Mobile app এর জন্য JSON এ পাঠানো)
    const response = NextResponse.json(
      {
        success: true,
        message: "User logged in successfully",
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          tokens: {
            access_token,
            refresh_token,
          },
        },
        status: httpStatus.OK,
      },
      { status: httpStatus.OK }
    );

    // ৭. Browser এর জন্য httpOnly কুকিতে সেট করা (Web Client এর জন্য)
    response.cookies.set(ACCESS_TOKEN_NAME, access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    response.cookies.set(REFRESH_TOKEN_NAME, refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
        status: httpStatus.INTERNAL_SERVER_ERROR,
      },
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
