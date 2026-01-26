import { cookies } from "next/headers";
import { zen } from "#/shared/lib/zenstack";

export async function findOrCreateCart() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cart")?.value;

  if (cartId) {
    return zen.cart.findUnique({
      where: {
        id: cartId
      },
      include: {
        items: {
          include: {
            excludedIngredients: { select: { id: true } },
            selectedToppings: { select: { id: true } }
          }
        }
      }
    });
  }

  const newCart = await zen.cart.create({
    data: {},
    include: {
      items: {
        include: {
          excludedIngredients: { select: { id: true } },
          selectedToppings: { select: { id: true } }
        }
      }
    }
  });

  cookieStore.set("cart", newCart.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24
  });

  return newCart;
}
