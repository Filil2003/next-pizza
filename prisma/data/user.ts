import { hash } from "node:crypto";
import type { Prisma } from "#/shared/lib/prisma";

export const user: Prisma.UserCreateInput[] = [
  createUserSeed({
    fullName: "User",
    email: "user@gmail.com",
    password: "user"
  }),
  createUserSeed({
    fullName: "Admin",
    email: "admin@admin.com",
    password: "admin",
    role: "ADMIN"
  })
] as const;

/* ===== Helpers ===== */
type UserSeedParams = Prisma.UserCreateInput;

function createUserSeed({
  fullName,
  email,
  password,
  role = "CUSTOMER"
}: UserSeedParams): Prisma.UserCreateInput {
  return {
    fullName,
    email,
    role,
    password: hash("sha256", password)
  };
}
