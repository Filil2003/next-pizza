import { notFound } from "next/dist/client/components/not-found";
import { PizzaConfigurator } from "#/components/product";
import { prisma } from "#/shared/lib/prisma";
import { Container } from "#/shared/ui";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PizzaPage({ params }: Props) {
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

  return (
    <Container>
      <PizzaConfigurator
        pizza={{
          name: pizza.name,
          slug: pizza.slug,
          ingredients: pizza.ingredients.map(({ ingredient, isRemovable }) => ({
            name: ingredient.name,
            isRemovable
          })),
          toppings: pizza.toppings.map(({ ingredient }) => ({
            name: ingredient.name,
            price: ingredient.price,
            imageUrn: ingredient.imageUrn
          }))
        }}
      />
    </Container>
  );
}
