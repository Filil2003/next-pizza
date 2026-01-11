"use client";

import { useRouter } from "next/navigation";
import { PizzaConfigurator } from "#/components";
import type { Pizza } from "#/shared/lib/prisma";
import { cn } from "#/shared/lib/tailwind";
import { Dialog, DialogContent } from "#/shared/ui";

/* ===== Typing props ===== */
interface Props {
  pizza: Pizza;
  className?: string;
}

/* ===== PizzaConfiguratorModal component ===== */
export function PizzaConfiguratorModal({ pizza, className }: Props) {
  const router = useRouter();

  return (
    <Dialog open={Boolean(pizza)} onOpenChange={() => router.back()}>
      <DialogContent className={cn("", className)}>
        <PizzaConfigurator
          pizza={{
            name: pizza.name,
            slug: pizza.slug,
            ingredients: pizza.ingredients.map(
              ({ ingredient, isRemovable }) => ({
                name: ingredient.name,
                isRemovable
              })
            ),
            toppings: pizza.toppings.map(({ ingredient }) => ({
              name: ingredient.name,
              price: ingredient.price,
              imageUrn: ingredient.imageUrn
            }))
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
