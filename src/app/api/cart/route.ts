import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { zen } from "#/shared/lib/zenstack";

export async function GET() {
  try {
    const cartId = (await cookies()).get("cart")?.value;
    if (!cartId) return NextResponse.json([]);

    const cartItems = await zen.cartItem.findMany({
      where: {
        cartId: cartId
      },
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        quantity: true,
        excludedIngredients: {
          select: {
            ingredient: {
              select: { name: true }
            }
          }
        },
        selectedToppings: {
          select: {
            price: true,
            ingredient: {
              select: { name: true }
            }
          }
        },
        productVariant: {
          select: {
            price: true,
            weight: true,
            options: true,
            imageUrl: true,
            product: {
              select: {
                name: true,
                inStock: true
              }
            }
          }
        }
      }
    });

    const items = cartItems.map((item) => ({
      id: item.id,
      name: item.productVariant.product.name,
      inStock: item.productVariant.product.inStock,
      summary: [
        ...Object.values(item.productVariant.options),
        item.productVariant.weight
      ]
        .filter(Boolean)
        .join(", "),

      imageUrl: item.productVariant.imageUrl,
      price: item.productVariant.price,
      quantity: item.quantity,
      excludedIngredients: item.excludedIngredients.map(
        ({ ingredient }) => ingredient.name
      ),
      selectedToppings: item.selectedToppings.map(({ price, ingredient }) => ({
        price,
        name: ingredient?.name || ""
      }))
    }));

    return NextResponse.json(items);
  } catch (_) {
    return new NextResponse(null, { status: 500 });
  }
}
