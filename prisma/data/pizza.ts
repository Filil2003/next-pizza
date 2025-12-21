import slugify from "slugify";
import type { Prisma } from "#/lib/prisma";
import { ingredient } from "./ingredient.ts";

export const pizza: Prisma.PizzaCreateInput[] = [
  createPizzaSeed({
    name: "Пепперони фреш",
    ingredients: [
      {
        name: "Пикантная пепперони",
        isRemovable: true
      },
      { name: "Моцарелла" },
      {
        name: "Томаты",
        isRemovable: true
      }
    ]
  }),
  createPizzaSeed({
    name: "Четыре сыра",
    ingredients: [
      {
        name: "Сыр блю чиз",
        isRemovable: true
      },
      {
        name: "Сыры чеддер и пармезан",
        isRemovable: true
      },
      { name: "Моцарелла" }
    ]
  })
] as const;

export const pizzaSize: Prisma.PizzaSizeCreateInput[] = [
  { name: "SMALL", value: 25 },
  { name: "MEDIUM", value: 30 },
  { name: "LARGE", value: 35 },
  { name: "XLARGE", value: 40 }
] as const;

export const pizzaCrust: Prisma.PizzaCrustCreateInput[] = [
  { name: "TRADITIONAL", value: "Традиционное" },
  { name: "THIN", value: "Тонкое" }
] as const;

/* ===== Helpers ===== */
interface PizzaSeedParams {
  name: string;
  ingredients: IngredientSeedParams[];
}

type IngredientSeedParams = Pick<Prisma.IngredientCreateInput, "name"> &
  Pick<Prisma.PizzaIngredientCreateInput, "isRemovable">;

function createPizzaSeed({
  name,
  ingredients
}: PizzaSeedParams): Prisma.PizzaCreateInput {
  const slug = slugify(name, { lower: true, strict: true, locale: "ru" });

  return {
    name,
    slug,
    ingredients: {
      create: ingredients.map(({ name, isRemovable = false }) => ({
        ingredient: { connect: { name } },
        isRemovable
      }))
    },
    toppings: {
      create: ingredient.map(({ name }) => ({
        ingredient: { connect: { name } }
      }))
    },
    variants: { create: generatePizzaVariants(slug) }
  };
}

function generatePizzaVariants(slug: string) {
  const sizes = ["SMALL", "MEDIUM", "LARGE", "XLARGE"] as const;
  const crusts = ["TRADITIONAL", "THIN"] as const;

  const prices = calculateRandomPrices();

  return sizes.flatMap((sizeId) =>
    crusts
      .filter((crustId) => !(sizeId === "SMALL" && crustId === "THIN"))
      .map((crustId) => ({
        sizeId,
        crustId,
        price: prices[sizeId],
        imageUrn: `/pizza/catalog/${slug}/${sizeId.toLowerCase()}-${crustId.toLowerCase()}.png`
      }))
  );
}

function calculateRandomPrices() {
  const MIN_LARGE = 289;
  const MAX_LARGE = 659;
  const AVG_TARGET = 432;

  // Generate a base LARGE price based on the target average
  const baseLargePrice = Math.round(
    Math.random() > 0.5
      ? AVG_TARGET + Math.random() * (MAX_LARGE - AVG_TARGET)
      : AVG_TARGET - Math.random() * (AVG_TARGET - MIN_LARGE)
  );

  // Coefficients for other sizes
  return {
    SMALL: Math.round(baseLargePrice * 0.7) * 100,
    MEDIUM: Math.round(baseLargePrice * 0.85) * 100,
    LARGE: baseLargePrice * 100,
    XLARGE: Math.round(baseLargePrice * 1.2) * 100
  };
}
