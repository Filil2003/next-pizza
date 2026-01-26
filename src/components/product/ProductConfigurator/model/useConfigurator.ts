import { parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";
import { useSet } from "#/shared/lib/react";

type Product = {
  name: string;
  description: string;
  inStock: boolean;
  ingredients: {
    id: string;
    name: string;
    isRemovable: boolean;
  }[];
  variants: {
    id: string;
    isShowCase: boolean;
    price: number;
    imageUrl: string;
    options: Record<string, string>;
    toppings: {
      id: string;
      name: string;
      price: number;
      imageUrl: string;
    }[];
    toppingsLimit: number | null;
    weight?: string;
  }[];
};

export function useConfigurator(product: Product) {
  const [excludedIngredients, { toggle: toggleExcludedIngredient }] =
    useSet<string>();
  const [selectedToppings, { toggle: toggleSelectedTopping }] =
    useSet<string>();
  const [selectedVariantId, setSelectedVariantId] = useQueryState(
    "variation",
    parseAsString
  );

  const selectedVariant =
    product.variants.find(({ id }) => id === selectedVariantId) ??
    product.variants.find(({ isShowCase }) => isShowCase) ??
    // biome-ignore lint/style/noNonNullAssertion: <Guaranteed by the database>
    product.variants[0]!;

  const optionsGroups = useMemo(
    () =>
      product.variants.reduce<Record<string, Set<string>>>(
        (group, { options }) => {
          for (const [key, value] of Object.entries(options)) {
            group[key] ??= new Set();
            group[key].add(value as string);
          }
          return group;
        },
        {}
      ),
    [product.variants]
  );

  function getIsOptionDisabled(groupKey: string, optionValue: string) {
    const hasVariant = product.variants.some((variant) =>
      Object.entries(selectedVariant.options).every(([key, value]) =>
        key === groupKey
          ? variant.options[key] === optionValue
          : variant.options[key] === value
      )
    );

    return !hasVariant;
  }

  function handleOptionChange(value: string, groupKey: string) {
    const nextOptions = {
      ...selectedVariant.options,
      [groupKey]: value
    };

    const match = product.variants.find((variant) =>
      Object.entries(nextOptions).every(
        ([key, optionValue]) => variant.options[key] === optionValue
      )
    );

    if (!match) return;

    void setSelectedVariantId(match.id);
  }

  const totalPrice =
    selectedVariant.price +
    selectedVariant.toppings.reduce((acc, cur) => {
      if (selectedToppings.has(cur.name)) return acc + cur.price;
      return acc;
    }, 0);

  return {
    selectedVariant,
    optionsGroups,
    getIsOptionDisabled,
    handleOptionChange,
    totalPrice,

    excludedIngredients,
    toggleExcludedIngredient,

    selectedToppings,
    toggleSelectedTopping
  };
}
