import slugify from "slugify";
import type { Prisma } from "#/shared/lib/prisma";

export const ingredient: Prisma.IngredientCreateInput[] = [
  createIngredientSeed({
    name: "Сырный бортик",
    price: 20500
  }),
  createIngredientSeed({
    name: "Моцарелла",
    price: 9000
  }),
  createIngredientSeed({
    name: "Сыры чеддер и пармезан",
    price: 7900
  }),
  createIngredientSeed({
    name: "Сыр блю чиз",
    price: 14900
  }),
  createIngredientSeed({
    name: "Пряная говядина",
    price: 11900
  }),
  createIngredientSeed({
    name: "Острый перец халапеньо",
    price: 5900
  }),
  createIngredientSeed({
    name: "Цыпленок",
    price: 7900
  }),
  createIngredientSeed({
    name: "Шампиньоны",
    price: 5900
  }),
  createIngredientSeed({
    name: "Бекон",
    price: 7900
  }),
  createIngredientSeed({
    name: "Ветчина",
    price: 7900
  }),
  createIngredientSeed({
    name: "Пикантная пепперони",
    price: 7900
  }),
  createIngredientSeed({
    name: "Острые колбаски чоризо",
    price: 7900
  }),
  createIngredientSeed({
    name: "Маринованные огурчики",
    price: 5900
  }),
  createIngredientSeed({
    name: "Томаты",
    price: 5900
  }),
  createIngredientSeed({
    name: "Красный лук",
    price: 5900
  }),
  createIngredientSeed({
    name: "Ананасы",
    price: 5900
  }),
  createIngredientSeed({
    name: "Итальянские травы",
    price: 3900
  }),
  createIngredientSeed({
    name: "Сладкий перец",
    price: 5900
  }),
  createIngredientSeed({
    name: "Кубики брынзы",
    price: 7900
  }),
  createIngredientSeed({
    name: "Баварские колбаски",
    price: 12900
  }),
  createIngredientSeed({
    name: "Креветки",
    price: 22900
  }),
  createIngredientSeed({
    name: "Свиная шейка",
    price: 22900
  }),
  createIngredientSeed({
    name: "Чеснок",
    price: 5900
  }),
  createIngredientSeed({
    name: "Сливочный соус",
    price: 5900
  }),
  createIngredientSeed({
    name: "Томатный соус",
    price: 5900
  }),
  createIngredientSeed({
    name: "Соус сливочный хрен",
    price: 5900
  }),
  createIngredientSeed({
    name: "Соус терияки",
    price: 5900
  }),
  createIngredientSeed({
    name: "Соус песто",
    price: 5900
  }),
  createIngredientSeed({
    name: "Соус гриль",
    price: 5900
  }),
  createIngredientSeed({
    name: "Соус бургер",
    price: 5900
  }),
  createIngredientSeed({
    name: "Соус ранч",
    price: 5900
  }),
  createIngredientSeed({
    name: "Соус сладкий чили",
    price: 5900
  }),
  createIngredientSeed({
    name: "Грибной соус",
    price: 5900
  }),
  createIngredientSeed({
    name: "Сырный соус",
    price: 5900
  }),
  createIngredientSeed({
    name: "Соус барбекю",
    price: 5900
  })
] as const;

/* ===== Helpers ===== */
type IngredientSeedParams = Pick<
  Prisma.IngredientCreateInput,
  "name" | "price"
>;

function createIngredientSeed({
  name,
  price
}: IngredientSeedParams): Prisma.IngredientCreateInput {
  const slug = slugify(name, { lower: true, strict: true, locale: "ru" });

  return {
    name,
    price,
    imageUrn: `/pizza/ingredients/${slug}.png`
  };
}
