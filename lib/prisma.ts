import { PrismaClient } from "@prisma/client";

const connectionString =
  process.env.DATABASE_URL || process.env.NOTEBOOK_DATABASE_URL;

if (connectionString) {
  process.env.DATABASE_URL = connectionString;
  process.env.NOTEBOOK_DATABASE_URL = connectionString;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(connectionString ? { datasourceUrl: connectionString } : {}),
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
