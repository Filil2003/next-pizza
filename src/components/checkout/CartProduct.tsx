import { useMutation } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { mutations } from "#/components/checkout/api";
import { useAppearanceDelay } from "#/shared/lib/react";
import { cn } from "#/shared/lib/tailwind";
import { Button, Price } from "#/shared/ui";
import { QuantityCounter } from "./ui/QuantityCounter.tsx";

/* ===== Typing props ===== */
interface Props {
  product: {
    id: string;
    name: string;
    summary: string;
    inStock: boolean;
    imageUrl: string;
    price: number;
    quantity: number;
    excludedIngredients: string[];
    selectedToppings: {
      name: string;
      price: number;
    }[];
  };
  className?: string;
}

/* ===== CartProduct component ===== */
export function CartProduct({ product, className }: Props) {
  const deleteMutation = useMutation(mutations.deleteCartItem());

  const isPending = useAppearanceDelay(deleteMutation.isPending);

  function handleDelete() {
    deleteMutation.mutate(product.id);
  }

  const toppingsPrice =
    product.selectedToppings?.reduce((acc, { price }) => acc + price, 0) ?? 0;

  const totalPrice = (product.price + toppingsPrice) * product.quantity;

  return (
    <article
      className={cn("bg-white p-3", className, {
        "pointer-events-none opacity-50": isPending
      })}
    >
      <div
        className={cn("grid grid-cols-[1fr_4fr] items-start", {
          "opacity-50": !product.inStock
        })}
      >
        <div className="relative aspect-square">
          <Image
            draggable="false"
            src={product.imageUrl}
            alt={product.name}
            sizes="112px"
            fill
          />
        </div>
        <div className="p-2">
          <div className="flex justify-between gap-1">
            <h2 className="text-base font-bold leading-4">{product.name}</h2>
            <button onClick={handleDelete} type="button">
              <XIcon className="size-4" />
            </button>
          </div>
          <p className="text-sm font-semibold text-gray-500 lowercase first-letter:uppercase">
            {product.summary}
          </p>
          {product.excludedIngredients.length > 0 && (
            <p className="text-sm font-semibold text-red-700 lowercase first-letter:uppercase">
              - {product.excludedIngredients.join(", ")}
            </p>
          )}
          {product.selectedToppings.length > 0 && (
            <p className="text-sm font-semibold text-green-700 lowercase">
              + {product.selectedToppings.map(({ name }) => name).join(", ")}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 pr-2 border-t-2 border-gray-100">
        {product.inStock ? (
          <>
            <span>
              Цена: <Price className="font-bold" amount={totalPrice} />
            </span>
            <QuantityCounter product={product} />
          </>
        ) : (
          <>
            <span>Не можем добавить</span>
            <Button onClick={handleDelete}>Удалить</Button>
          </>
        )}
      </div>
    </article>
  );
}
