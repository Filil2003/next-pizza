import { type NextRequest, NextResponse } from "next/server";
import { zen } from "#/shared/lib/zenstack";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query") ?? "";

  const products = await zen.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive"
      }
    },
    take: 5
  });

  return NextResponse.json(products);
}
