import { type NextRequest, NextResponse } from "next/server";
import { zen } from "#/shared/lib/zenstack";
import { findOrCreateCart } from "../_lib";

interface RequestBody {
  productVariantId: string;
  excludedIngredientIds: string[];
  selectedToppingIds: string[];
}

export async function POST(request: NextRequest) {
  try {
    const cart = await findOrCreateCart();
    if (!cart) return new NextResponse(null, { status: 404 });

    const {
      productVariantId,
      excludedIngredientIds,
      selectedToppingIds
    }: RequestBody = await request.json();

    const result = await zen.$transaction(async (tx) => {
      const duplicateCandidates = await tx.cartItem.findMany({
        where: {
          cartId: cart.id,
          productVariantId
        },
        include: {
          excludedIngredients: { select: { id: true } },
          selectedToppings: { select: { id: true } }
        }
      });

      const sameConfigItem = duplicateCandidates.find((candidate) => {
        const exIds = candidate.excludedIngredients.map(({ id }) => id);
        const topIds = candidate.selectedToppings.map(({ id }) => id);
        return (
          sameSet(exIds, excludedIngredientIds) &&
          sameSet(topIds, selectedToppingIds)
        );
      });

      if (sameConfigItem) {
        return tx.cartItem.update({
          where: { id: sameConfigItem.id },
          data: { quantity: { increment: 1 } },
          select: {
            productVariant: {
              select: {
                options: true,
                weight: true,
                product: {
                  select: {
                    name: true
                  }
                }
              }
            },
            excludedIngredients: true,
            selectedToppings: true
          }
        });
      }

      return tx.cartItem.create({
        data: {
          cartId: cart.id,
          productVariantId,
          excludedIngredients: {
            connect: excludedIngredientIds.map((id) => ({ id }))
          },
          selectedToppings: {
            connect: selectedToppingIds.map((id) => ({ id }))
          }
        },
        select: {
          productVariant: {
            select: {
              options: true,
              weight: true,
              product: {
                select: {
                  name: true
                }
              }
            }
          },
          excludedIngredients: true,
          selectedToppings: true
        }
      });
    });

    return NextResponse.json(
      {
        name: result.productVariant.product.name,
        summary: [
          ...Object.values(result.productVariant.options),
          result.productVariant.weight
        ]
          .filter(Boolean)
          .join(", ")
      },
      { status: 201 }
    );
  } catch (_) {
    return new NextResponse(null, { status: 500 });
  }
}

function sameSet(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const s = new Set(a);
  return b.every((x) => s.has(x));
}
