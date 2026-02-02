import { type NextRequest, NextResponse } from "next/server";
import { zen } from "#/shared/lib/zenstack";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query") ?? "";

  if (!query) return NextResponse.json([]);

  const productsRaw = await zen.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive"
      }
    },
    take: 5,
    select: {
      name: true,
      slug: true,
      variants: {
        select: {
          price: true,
          imageUrl: true,
          isShowCase: true
        }
      }
    }
  });

  const products = productsRaw.map((product) => {
    const minPrice = Math.min(...product.variants.map(({ price }) => price));

    const showCaseVariant =
      product.variants.find(({ isShowCase }) => isShowCase) ??
      product.variants[0];

    return {
      name: product.name,
      slug: product.slug,
      minPrice,
      showCaseImageUrl: showCaseVariant?.imageUrl ?? ""
    };
  });

  return NextResponse.json(products);
}
