import { hash } from "node:crypto";
import type { Prisma } from "#/lib/prisma";

export const user: Prisma.UserCreateInput[] = [
  {
    fullName: "User",
    email: "user@gmail.com",
    password: hash("sha256", "user")
  },
  {
    fullName: "Admin",
    email: "admin@admin.com",
    password: hash("sha256", "admin"),
    role: "ADMIN"
  }
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

export const ingredient: Prisma.IngredientCreateInput[] = [
  {
    name: "Сырный бортик",
    price: 205,
    imageUrn: "/pizza/ingredients/cheese-crust.png"
  },
  {
    name: "Моцарелла",
    price: 90,
    imageUrn: "/pizza/ingredients/mozzarella.png"
  },
  {
    name: "Сыры чеддер и пармезан",
    price: 79,
    imageUrn: "/pizza/ingredients/cheddar-parmesan-cheese.png"
  },
  {
    name: "Сыр блю чиз",
    price: 149,
    imageUrn: "/pizza/ingredients/blue-cheese.png"
  },
  {
    name: "Пряная говядина",
    price: 119,
    imageUrn: "/pizza/ingredients/spicy-beef.png"
  },
  {
    name: "Острый перец халапеньо",
    price: 59,
    imageUrn: "/pizza/ingredients/jalapeno-pepper.png"
  },
  {
    name: "Нежный цыпленок",
    price: 79,
    imageUrn: "/pizza/ingredients/tender-chicken.png"
  },
  {
    name: "Шампиньоны",
    price: 59,
    imageUrn: "/pizza/ingredients/mushrooms.png"
  },
  {
    name: "Бекон",
    price: 79,
    imageUrn: "/pizza/ingredients/bacon.png"
  },
  {
    name: "Ветчина",
    price: 79,
    imageUrn: "/pizza/ingredients/ham.png"
  },
  {
    name: "Пикантная пепперони",
    price: 79,
    imageUrn: "/pizza/ingredients/pepperoni.png"
  },
  {
    name: "Острая чоризо",
    price: 79,
    imageUrn: "/pizza/ingredients/spicy-chorizo.png"
  },
  {
    name: "Маринованные огурчики",
    price: 59,
    imageUrn: "/pizza/ingredients/pickles.png"
  },
  {
    name: "Томаты",
    price: 59,
    imageUrn: "/pizza/ingredients/tomatoes.png"
  },
  {
    name: "Красный лук",
    price: 59,
    imageUrn: "/pizza/ingredients/red-onion.png"
  },
  {
    name: "Сочные ананасы",
    price: 59,
    imageUrn: "/pizza/ingredients/pineapple.png"
  },
  {
    name: "Итальянские травы",
    price: 39,
    imageUrn: "/pizza/ingredients/italian-herbs.png"
  },
  {
    name: "Сладкий перец",
    price: 59,
    imageUrn: "/pizza/ingredients/bell-pepper.png"
  },
  {
    name: "Кубики брынзы",
    price: 79,
    imageUrn: "/pizza/ingredients/feta-cubes.png"
  },
  {
    name: "Баварские колбаски",
    price: 129,
    imageUrn: "/pizza/ingredients/bavarian-sausages.png"
  },
  {
    name: "Креветки",
    price: 229,
    imageUrn: "/pizza/ingredients/shrimp.png"
  },
  {
    name: "Свиная шейка",
    price: 229,
    imageUrn: "/pizza/ingredients/pork-neck.png"
  },
  {
    name: "Сливочный хрен",
    price: 59,
    imageUrn: "/pizza/ingredients/creamy-horseradish.png"
  }
] as const;

export const pizza: Prisma.PizzaCreateInput[] = [
  {
    name: "Пепперони фреш",
    slug: "pepperoni-fresh",
    ingredients: {
      create: [
        {
          ingredient: { connect: { name: "Пикантная пепперони" } },
          isRemovable: true
        },
        { ingredient: { connect: { name: "Моцарелла" } } },
        {
          ingredient: { connect: { name: "Томаты" } },
          isRemovable: true
        }
      ]
    },
    toppings: {
      create: ingredient
        .filter((item) => item.name !== "Сырный бортик")
        .map(({ name }) => ({
          ingredient: { connect: { name } }
        }))
    },
    variants: {
      create: [
        { sizeId: "SMALL", crustId: "TRADITIONAL", price: 28900 },
        { sizeId: "MEDIUM", crustId: "TRADITIONAL", price: 36900 },
        { sizeId: "MEDIUM", crustId: "THIN", price: 36900 },
        { sizeId: "LARGE", crustId: "TRADITIONAL", price: 62900 },
        { sizeId: "LARGE", crustId: "THIN", price: 62900 },
        { sizeId: "XLARGE", crustId: "TRADITIONAL", price: 74900 },
        { sizeId: "XLARGE", crustId: "THIN", price: 74900 }
      ]
    }
  }
];

export const seedData = {
  user,
  pizzaSize,
  pizzaCrust,
  ingredient,
  pizza
} as const;
