import { notFound } from "next/dist/client/components/not-found";
import { PizzaConfiguratorModal } from "#/components/product";
import { prisma } from "#/shared/lib/prisma";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PizzaModal({ params }: Props) {
  const { slug } = await params;
  const pizza = await prisma.pizza.findFirst({
    where: { slug },
    include: {
      ingredients: {
        include: {
          ingredient: true
        }
      },
      toppings: {
        include: {
          ingredient: true
        }
      }
    }
  });

  if (!pizza) return notFound();

  return <PizzaConfiguratorModal pizza={pizza} />;
}
