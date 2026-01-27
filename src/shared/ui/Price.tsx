import type { ComponentProps } from "react";
import { cn } from "#/shared/lib/tailwind";

/* ===== Typing props ===== */
interface Props extends ComponentProps<"span"> {
  amount: number;
}

/* ===== Price component ===== */
export function Price({ amount, className, ...restProps }: Props) {
  const isFree = amount === 0;

  const formattedPrice = Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0
  }).format(amount / 100);

  return (
    <span className={cn("tabular-nums", className)} {...restProps}>
      {isFree ? "Бесплатно" : formattedPrice}
    </span>
  );
}
