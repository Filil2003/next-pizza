import { useMutation } from "@tanstack/react-query";
import { LoaderCircleIcon, Minus, Plus } from "lucide-react";
import { useAppearanceDelay } from "#/shared/lib/react";
import { cn } from "#/shared/lib/tailwind";
import { mutations } from "../api";

/* ===== Typing props ===== */
interface Props {
  product: {
    id: string;
    quantity: number;
  };
}

/* ===== QuantityCounter component ===== */
export function QuantityCounter({ product }: Props) {
  const updateMutation = useMutation(mutations.updateCartItemQuantity());
  const deleteMutation = useMutation(mutations.deleteCartItem());

  const isPending = useAppearanceDelay(
    updateMutation.isPending || deleteMutation.isPending
  );

  function handleDecrement() {
    if (product.quantity === 1) {
      deleteMutation.mutate(product.id);
    } else {
      updateMutation.mutate({ cartItemId: product.id, delta: -1 });
    }
  }

  function handleIncrement() {
    updateMutation.mutate({ cartItemId: product.id, delta: 1 });
  }

  return (
    <div className="relative flex text-primary-foreground rounded-full overflow-hidden">
      <button
        type="button"
        className="grid place-items-center size-8 bg-primary hover:bg-primary/90 transition-colors"
        onClick={handleDecrement}
        disabled={isPending}
        aria-label="Уменьшить количество"
      >
        <Minus className="h-4" aria-hidden />
      </button>
      <div className="flex items-center bg-primary px-1">
        {isPending && (
          <LoaderCircleIcon
            className="absolute inset-0 m-auto size-5 animate-spin"
            aria-hidden
          />
        )}
        <span
          className={cn("text-base", {
            "text-transparent": isPending
          })}
        >
          {product.quantity}
        </span>
      </div>
      <button
        type="button"
        className="grid place-items-center size-8 bg-primary hover:bg-primary/90 transition-colors"
        onClick={handleIncrement}
        disabled={isPending}
        aria-label="Увеличить количество"
      >
        <Plus className="h-4" aria-hidden />
      </button>
    </div>
  );
}
