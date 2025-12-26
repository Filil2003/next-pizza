import { prisma } from "#/shared/lib/prisma";
import * as seedData from "./data";

async function seed() {
  await prisma.user.createMany({
    data: seedData.user
  });

  await prisma.pizzaSize.createMany({
    data: seedData.pizzaSize
  });

  await prisma.pizzaCrust.createMany({
    data: seedData.pizzaCrust
  });

  await prisma.ingredient.createMany({
    data: seedData.ingredient
  });

  for (const pizza of seedData.pizza) {
    await prisma.pizza.create({
      data: pizza
    });
  }
}

seed().catch(console.error).finally(prisma.$disconnect);
