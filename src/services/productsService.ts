import { axiosInstance } from "#/shared/lib/axios";
import type { Product } from "#/shared/lib/zenstack";
import { ApiRoutes } from "./routes.ts";

export async function getAll() {
  const { data } = await axiosInstance.get<Product[]>(ApiRoutes.Products);

  return data;
}

export async function search(query: string) {
  const { data } = await axiosInstance.get(ApiRoutes.SearchProducts, {
    params: { query }
  });

  return data;
}
