import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "#/lib/prisma";

export type SearchProductResponse = {
  id: string;
  name: string;
  imageUrn: string;
};

export async function GET(
  request: NextRequest
): Promise<NextResponse<SearchProductResponse[]>> {
  const query = request.nextUrl.searchParams.get("query") ?? "";

  const products = await prisma.pizza.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive"
      }
    },
    include: {
      variants: {
        where: {
          sizeId: "LARGE",
          crustId: "TRADITIONAL"
        },
        select: {
          imageUrn: true
        }
      }
    },
    take: 5
  });

  const flattenedProducts = products.map(({ variants, ...product }) => ({
    ...product,
    imageUrn: variants[0]?.imageUrn ?? ""
  }));

  return NextResponse.json(flattenedProducts);
}
