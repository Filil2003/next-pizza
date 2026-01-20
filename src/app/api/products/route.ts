import { NextResponse } from "next/server";
import { zen } from "#/shared/lib/zenstack";

export async function GET() {
  const products = await zen.product.findMany();

  // const flattenedProducts: SearchProductDto[] = products.map(
  //   ({ variants, ingredients, ...product }) => ({
  //     ...product,
  //     ingredients: ingredients.map(({ ingredient }) => ingredient),
  //     imageUrn: variants[0]?.imageUrn ?? ""
  //   })
  // );

  return NextResponse.json(products);
}
