import { axiosInstance } from "#/shared/lib/axios";
import type { Ingredient } from "#/shared/lib/zenstack";
import { ApiRoutes } from "./routes.ts";

export async function getAll() {
  const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.Ingredients);

  return data;
}
