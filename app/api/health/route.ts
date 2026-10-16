import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse, handleOptions } from "@/lib/api-response";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET() {
  try {
    // Attempt a lightweight ping or read operation
    await prisma.$runCommandRaw({ ping: 1 });
    return successResponse({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
    });
  } catch (error) {
    return errorResponse("Database connection failed", 503, {
      message: error instanceof Error ? error.message : "Unknown error",
      tip: "Please check your DATABASE_URL in .env to ensure MongoDB is reachable.",
    });
  }
}
