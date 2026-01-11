"use client";

import { cn } from "#/shared/lib/tailwind";
import { Button } from "#/shared/ui";
import { ScrollArea } from "#/shared/ui/ScrollArea";
import { CrustPicker } from "./CrustPicker.tsx";
import { IngredientsExcluder } from "./IngredientsExcluder.tsx";
import { Preview } from "./Preview.tsx";
import { SizePicker } from "./SizePicker.tsx";
import { ToppingsPicker } from "./ToppingsPicker.tsx";

/* ===== Typing props ===== */
interface Props {
  pizza: {
    name: string;
    slug: string;
    ingredients: {
      name: string;
      isRemovable: boolean;
    }[];
    toppings: {
      name: string;
      price: number;
      imageUrn: string;
    }[];
  };
  className?: string;
}

/* ===== PizzaConfigurator component ===== */
export function PizzaConfigurator({ pizza, className }: Props) {
  const finalPrice = 1500;

  return (
    <article
      className={cn(
        "grid grid-cols-[2.5fr_2fr] items-center h-full",
        className
      )}
    >
      {/* ===== Preview ===== */}
      <div className="grid content-center h-full bg-secondary">
        <Preview
          name={pizza.name}
          slug={pizza.slug}
          size={"large"}
          crust={"traditional"}
        />
      </div>

      {/* ===== Configurator ===== */}
      <div className="flex flex-col py-7.5 h-full">
        <ScrollArea className="grow h-0 overflow-visible" type="auto">
          {/* Summary */}
          <header className="px-7.5">
            <h1 className="font-bold text-2xl">{pizza.name}</h1>
            <p className="text-sm font-semibold text-gray-500">
              30 см, традиционное тесто, 560 г
            </p>
          </header>

          {/* Ingredients */}
          <IngredientsExcluder
            className="mb-3.5 px-7.5"
            ingredients={pizza.ingredients}
          />

          {/* Size */}
          <SizePicker className="mb-2 px-7.5" />

          {/* Crust */}
          <CrustPicker className="mb-3.5 px-7.5" />

          {/* Toppings */}
          <ToppingsPicker className="px-7.5 pb-5" toppings={pizza.toppings} />
        </ScrollArea>

        {/* Action */}
        <div className="pt-6 px-7.5">
          <Button className="text-base font-bold rounded-full w-full h-12">
            В корзину за {finalPrice} ₽
          </Button>
        </div>
      </div>
    </article>
  );
}
