import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client.ts";

const globalWithPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalWithPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL
    })
  });

if (process.env.NODE_ENV !== "production") globalWithPrisma.prisma = prisma;

export { prisma };
export type * from "./generated/client";
