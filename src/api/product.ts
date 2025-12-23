import type { SearchProductResponse } from "#/app/api/products/search/route.ts";
import { ApiRoutes } from "./constants.ts";
import { axiosInstance } from "./instance.ts";

export async function search(query: string) {
  const { data } = await axiosInstance.get<SearchProductResponse[]>(
    ApiRoutes.SearchProducts,
    {
      params: { query }
    }
  );

  return data;
}
