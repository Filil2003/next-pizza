import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { zen } from "#/shared/lib/zenstack";

interface RequestBody {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export async function POST(request: NextRequest) {
  try {
    const cartId = (await cookies()).get("cart")?.value;
    if (!cartId) return new NextResponse(null, { status: 401 });

    const cart = await zen.cart.findUnique({
      where: { id: cartId },
      select: {
        items: {
          select: {
            quantity: true,
            productVariant: {
              select: {
                price: true,
                options: true,
                weight: true,
                product: { select: { name: true } }
              }
            },
            excludedIngredients: {
              include: { ingredient: { select: { name: true } } }
            },
            selectedToppings: {
              include: { ingredient: { select: { name: true } } }
            }
          }
        }
      }
    });
    if (!cart) return new NextResponse(null, { status: 404 });

    const bodyData: RequestBody = (await request.json()).data;

    const order = await zen.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          ...bodyData,
          totalPrice: cart.items.reduce((total, item) => {
            const toppingsTotal = (item.selectedToppings ?? []).reduce(
              (sum, topping) => sum + topping.price,
              0
            );
            const unitPrice = item.productVariant.price + toppingsTotal;
            return total + unitPrice * item.quantity;
          }, 0),
          items: JSON.stringify(
            cart.items.map((item) => ({
              name: item.productVariant.product.name,
              summary: [
                ...Object.values(item.productVariant.options),
                item.productVariant.weight
              ]
                .filter(Boolean)
                .join(", "),
              excludedIngredients: item.excludedIngredients.map(
                ({ ingredient }) => ingredient?.name
              ),
              selectedToppings: item.selectedToppings.map(
                ({ ingredient }) => ingredient?.name
              ),
              quantity: item.quantity
            }))
          )
        }
      });
      await tx.cartItem.deleteMany({ where: { cartId } });
      return order;
    });

    const response = await fetch("https://api.yookassa.ru/v3/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotence-Key": crypto.randomUUID(),
        Authorization: `Basic ${btoa(`${process.env["YOOKASSA_SHOP_ID"]}:${process.env["YOOKASSA_API_KEY"]}`)}`
      },
      body: JSON.stringify({
        capture: true,
        amount: {
          value: order.totalPrice / 100,
          currency: "RUB"
        },
        description: `Заказ №${order.id}`,
        metadata: { orderId: order.id },
        confirmation: {
          type: "redirect",
          return_url: request.headers.get("origin")
        }
      })
    });

    const payment = await response.json();

    zen.order.update({
      where: { id: order.id },
      data: { paymentId: payment.id }
    });

    if (payment.confirmation?.confirmation_url) {
      return NextResponse.json(
        {
          confirmationUrl: payment.confirmation.confirmation_url
        },
        { status: 201 }
      );
    }
    return new NextResponse(null, { status: 400 });
  } catch (_) {
    return new NextResponse(null, { status: 500 });
  }
}
