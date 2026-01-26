import { notFound } from "next/dist/client/components/not-found";
import { ProductConfigurator } from "#/components/product";
import { zen } from "#/shared/lib/zenstack";
import { Container } from "#/shared/ui";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await zen.product.findUnique({
    where: { slug },
    select: {
      name: true,
      description: true,
      inStock: true,
      ingredients: {
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          isRemovable: true,
          ingredient: {
            select: {
              name: true
            }
          }
        }
      },
      variants: {
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          isShowCase: true,
          weight: true,
          price: true,
          imageUrl: true,
          options: true,
          toppings: {
            select: {
              id: true,
              price: true,
              ingredient: {
                select: {
                  name: true,
                  imageUrl: true
                }
              }
            }
          },
          toppingsLimit: true
        }
      }
    }
  });

  if (!product) return notFound();

  return (
    <Container>
      <ProductConfigurator
        product={{
          name: product.name,
          description: product.description ?? "",
          ingredients: product.ingredients.map(
            ({ id, ingredient, isRemovable }) => ({
              id,
              name: ingredient.name,
              isRemovable
            })
          ),
          variants: product.variants.map((variant) => ({
            id: variant.id,
            isShowCase: variant.isShowCase,
            weight: variant.weight ?? "",
            price: variant.price,
            imageUrl: variant.imageUrl ?? "",
            options: variant.options as Record<string, string>,
            toppings: variant.toppings.map(({ id, price, ingredient }) => ({
              id,
              price,
              name: ingredient?.name ?? "",
              imageUrl: ingredient?.imageUrl ?? ""
            })),
            toppingsLimit: variant.toppingsLimit
          }))
        }}
      />
    </Container>
  );
}
