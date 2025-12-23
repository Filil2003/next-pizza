import type { Ingredient } from "#/lib/prisma/generated/client.ts";
import { ApiRoutes } from "./constants.ts";
import { axiosInstance } from "./instance.ts";

export async function getAll() {
  const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.Ingredients);

  return data;
}
