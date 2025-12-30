import { NextResponse } from "next/server";
import type { SearchProductDto } from "#/shared/dto";
import { prisma } from "#/shared/lib/prisma";

export async function GET() {
  const products = await prisma.pizza.findMany({
    include: {
      variants: {
        where: {
          sizeId: "LARGE",
          crustId: "TRADITIONAL"
        },
        select: {
          imageUrn: true
        }
      },
      ingredients: {
        include: {
          ingredient: true
        }
      }
    }
  });

  console.log("==============================================");
  console.log(products[0]);
  console.log("==============================================");

  const flattenedProducts: SearchProductDto[] = products.map(
    ({ variants, ingredients, ...product }) => ({
      ...product,
      ingredients: ingredients.map(({ ingredient }) => ingredient),
      imageUrn: variants[0]?.imageUrn ?? ""
    })
  );

  return NextResponse.json(flattenedProducts);
}
