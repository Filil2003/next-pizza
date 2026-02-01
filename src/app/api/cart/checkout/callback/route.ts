import { type NextRequest, NextResponse } from "next/server";
import { OrderStatus, zen } from "#/shared/lib/zenstack";

interface CallbackData {
  object: {
    metadata: {
      orderId: string;
    };
    status: "pending" | "succeeded" | "canceled";
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: CallbackData = await request.json();

    const isSucceeded = body.object.status === "succeeded";

    await zen.order.update({
      where: { id: body.object.metadata.orderId },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED
      }
    });
    return new NextResponse(null, { status: 200 });
  } catch (_) {
    return new NextResponse(null, { status: 500 });
  }
}
