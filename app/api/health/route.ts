import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import httpStatus from "http-status";

export async function GET() {
  try {
    // Attempt a lightweight ping or read operation
    await prisma.$runCommandRaw({ ping: 1 });
    return NextResponse.json(
      {
        success: true,
        data: {
          status: "healthy",
          timestamp: new Date().toISOString(),
          database: "connected",
        },
        status: httpStatus.OK,
      },
      { status: httpStatus.OK }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
        tip: "Please check your DATABASE_URL in .env to ensure MongoDB is reachable.",
        status: httpStatus.SERVICE_UNAVAILABLE,
      },
      { status: httpStatus.SERVICE_UNAVAILABLE }
    );
  }
}
