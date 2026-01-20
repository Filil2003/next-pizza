import { axiosInstance } from "#/shared/lib/axios";

export async function search(query: string) {
  const { data } = await axiosInstance.get<
    {
      name: string;
      slug: string;
      minPrice: number;
      showCaseImageUrl: string;
    }[]
  >("products/search", {
    params: { query }
  });

  return data;
}
