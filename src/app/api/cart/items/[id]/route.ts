import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { zen } from "#/shared/lib/zenstack";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const cartId = (await cookies()).get("cart")?.value;
    if (!cartId) return new NextResponse(null, { status: 401 });

    const { id } = await params;
    const { delta }: { delta: number } = await request.json();

    const updatedItem = await zen.cartItem.update({
      where: { id, cartId },
      data: { quantity: { increment: delta } }
    });

    return NextResponse.json(updatedItem);
  } catch (_) {
    return new NextResponse(null, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const cartId = (await cookies()).get("cart")?.value;
    if (!cartId) return new NextResponse(null, { status: 401 });

    const { id } = await params;

    await zen.cartItem.delete({ where: { id, cartId } });

    return new NextResponse(null, { status: 204 });
  } catch (_) {
    return new NextResponse(null, { status: 500 });
  }
}
