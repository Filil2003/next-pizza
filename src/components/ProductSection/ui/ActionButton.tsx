"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { mutations } from "#/components/checkout/api";
import { cn } from "#/shared/lib/tailwind";
import { Button } from "#/shared/ui";

/* ===== Typing props ===== */
interface Props {
  slug: string;
  showCaseVariantId: string;
  inStock: boolean;
  hasVariants: boolean;
  className?: string;
}

/* ===== ActionButton component ===== */
export function ActionButton({
  slug,
  showCaseVariantId,
  inStock,
  hasVariants,
  className
}: Props) {
  const router = useRouter();
  const { mutate, isPending } = useMutation(mutations.addToCart());

  function getButtonContent() {
    if (!inStock) return "Раскупили";
    if (hasVariants) return "Выбрать";
    return "В корзину";
  }

  const handleClick = () => {
    if (!inStock || isPending) return;

    if (hasVariants) router.push(`/product/${slug}`);
    else mutate({ productVariantId: showCaseVariantId });
  };

  return (
    <Button
      className={cn("relative text-base font-bold", className)}
      onClick={handleClick}
      disabled={!inStock}
      loading={isPending}
    >
      {getButtonContent()}
    </Button>
  );
}
