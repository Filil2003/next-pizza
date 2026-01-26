"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { mutations } from "#/components/checkout/api";
import { useAppearanceDelay } from "#/shared/lib/react";
import { cn } from "#/shared/lib/tailwind";
import { Button, ToggleGroup } from "#/shared/ui";
import { ScrollArea } from "#/shared/ui/ScrollArea";
import { useConfigurator } from "../model";
import { IngredientsExcluder } from "./IngredientsExcluder.tsx";
import { Preview } from "./Preview.tsx";
import { ToppingsPicker } from "./ToppingsPicker.tsx";

/* ===== Typing props ===== */
interface Props {
  product: Parameters<typeof useConfigurator>[0];
  className?: string;
}

/* ===== ProductConfigurator component ===== */
export function ProductConfigurator({ product, className }: Props) {
  const {
    selectedVariant,
    optionsGroups,
    getIsOptionDisabled,
    handleOptionChange,
    totalPrice,
    excludedIngredients,
    toggleExcludedIngredient,
    selectedToppings,
    toggleSelectedTopping
  } = useConfigurator(product);

  const router = useRouter();
  const addMutation = useMutation(mutations.addToCart());

  const isPending = useAppearanceDelay(addMutation.isPending);

  const summary = [
    ...Object.values(selectedVariant.options),
    selectedVariant.weight
  ]
    .filter(Boolean)
    .join(", ");

  function handleAddToCart() {
    addMutation.mutate(
      {
        productVariantId: selectedVariant.id,
        excludedIngredientIds: product.ingredients
          .filter(
            ({ name, isRemovable }) =>
              isRemovable && excludedIngredients.has(name)
          )
          .flatMap(({ id }) => id),
        selectedToppingIds: selectedVariant.toppings
          .filter(({ name }) => selectedToppings.has(name))
          .flatMap(({ id }) => id)
      },
      {
        onSuccess: () => void router.back()
      }
    );
  }

  return (
    <article
      className={cn(
        "grid grid-cols-[2.5fr_2fr] items-center h-full",
        className
      )}
    >
      {/* ===== Preview ===== */}
      <Preview
        name={product.name}
        size={selectedVariant.options["size"] ?? ""}
        src={selectedVariant.imageUrl}
      />

      {/* ===== Configurator ===== */}
      <div className="flex flex-col py-7.5 h-full">
        <ScrollArea className="grow h-0 overflow-visible" type="auto">
          {/* Header */}
          <header className="px-7.5">
            <h1 className="font-bold text-2xl">{product.name}</h1>
            <p className="mt-1 text-sm font-semibold text-gray-500 lowercase first-letter:uppercase">
              {summary}
            </p>
            {product.description && (
              <p className="mt-1 text-sm leading-5 font-medium">
                {product.description}
              </p>
            )}
          </header>

          {/* Ingredients */}
          {product.ingredients.length > 0 && (
            <IngredientsExcluder
              className="px-7.5"
              ingredients={product.ingredients}
              excluded={excludedIngredients}
              onToggle={toggleExcludedIngredient}
            />
          )}

          {/* ToggleGroup */}
          <div className="mt-3.5">
            {Object.entries(optionsGroups).map(([groupKey, options]) => {
              if (options.size <= 1) return null;

              const toggleOptions = Array.from(options).map((value) => ({
                value,
                isDisabled: getIsOptionDisabled(groupKey, value)
              }));

              return (
                <section key={groupKey} className="px-7.5 mb-2">
                  <ToggleGroup
                    options={toggleOptions}
                    // biome-ignore lint/style/noNonNullAssertion: <Guaranteed by the database>
                    value={selectedVariant.options[groupKey]!}
                    onChange={(value) => handleOptionChange(value, groupKey)}
                  />
                </section>
              );
            })}
          </div>

          {/* Toppings */}
          {selectedVariant.toppings.length > 0 && (
            <ToppingsPicker
              className="px-7.5 pb-5"
              toppings={selectedVariant.toppings}
              toppingsLimit={selectedVariant.toppingsLimit}
              selected={selectedToppings}
              onToggle={toggleSelectedTopping}
            />
          )}
        </ScrollArea>

        {/* Action */}
        <footer className="pt-6 px-7.5">
          <Button
            className="text-base font-bold w-full h-12"
            onClick={handleAddToCart}
            loading={isPending}
            disabled={!product.inStock}
          >
            {product.inStock
              ? `В корзину за ${totalPrice / 100} ₽`
              : "Раскупили"}
          </Button>
        </footer>
      </div>
    </article>
  );
}
