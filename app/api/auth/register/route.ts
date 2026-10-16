import { NextRequest, NextResponse } from "next/server";
import { RegisterInput, ValidationErrorItem } from "@/types";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {

  try {

    const body = (await request.json().catch(() => null)) as RegisterInput | null;
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid request payload" },
        { status: 400 }
      );
    }

    const { name, email, password } = body;

    // ১. সব ভ্যালিডেশন এরর Array হিসেবে কালেক্ট করা
    const errors: ValidationErrorItem[] = [];

    // Name Validation (Presence, Type & Empty check)
    if (name === undefined || name === null || name === "") {
      errors.push({ field: "name", message: "Name is required" });
    } else if (typeof name !== "string") {
      errors.push({ field: "name", message: "Name must be a string" });
    } else if (!name.trim()) {
      errors.push({ field: "name", message: "Name cannot be empty" });
    }

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
    } else if (password.length < 6) {
      errors.push({ field: "password", message: "Password must be at least 6 characters long" });
    }

    // ২. কোনো এরর থাকলে 400 রিটার্ন করা
    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors, // e.g. [{ field: "name", message: "..." }, { field: "email", message: "..." }]
        },
        { status: 400 }
      );
    }

    // ৩. ডাটাবেসে ইমেল চেক করা (ডুপ্লিকেট প্রিভেন্ট করা)
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      errors.push({ field: "email", message: "Email already exists" });
      return NextResponse.json(
        { success: false, message: "Validation failed", errors },
        { status: 409 } // 409 Conflict
      );
    }

    // ৪. পাসওয়ার্ড হ্যাশ করা
    const hashedPassword = await bcrypt.hash(password, 12);

    // ৫. ডেটাবেসে ইউজার তৈরি করা

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    console.log("New user created:", newUser);

    return NextResponse.json(
      { success: true, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }


}
