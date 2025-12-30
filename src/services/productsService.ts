import type { SearchProductDto } from "#/shared/dto";
import { axiosInstance } from "#/shared/lib/axios";
import { ApiRoutes } from "./routes.ts";

export async function getAll() {
  const { data } = await axiosInstance.get<SearchProductDto[]>(
    ApiRoutes.Products
  );

  return data;
}

export async function search(query: string) {
  const { data } = await axiosInstance.get<SearchProductDto[]>(
    ApiRoutes.SearchProducts,
    {
      params: { query }
    }
  );

  return data;
}
