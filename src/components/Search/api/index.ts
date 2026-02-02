import { queryOptions } from "@tanstack/react-query";

export const queries = {
  search: (query: string) =>
    queryOptions<
      {
        name: string;
        slug: string;
        minPrice: number;
        showCaseImageUrl: string;
      }[]
    >({
      queryKey: ["search", query],
      queryFn: async () => {
        const res = await fetch(
          `/api/products/search?query=${encodeURIComponent(query)}`,
          {
            credentials: "include"
          }
        );

        return res.json();
      },
      refetchOnWindowFocus: false
    })
};
