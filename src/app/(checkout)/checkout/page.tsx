import { OrderForm } from "#/components/checkout/ui/OrderForm.tsx";
import { OrderSummary } from "#/components/checkout/ui/OrderSummary.tsx";
import { Container } from "#/shared/ui";

export default function CheckoutPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-5">Заказ на доставку</h1>
      <div className="grid grid-cols-[1.75fr_1fr] gap-20">
        <OrderForm />
        <OrderSummary className="max-h-svh" />
      </div>
    </Container>
  );
}
