import { notFound } from "next/dist/client/components/not-found";
import { ProductConfiguratorModal } from "#/components/product";
import { zen } from "#/shared/lib/zenstack";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PizzaModal({ params }: Props) {
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
              price: true,
              ingredient: {
                select: {
                  name: true,
                  imageUrl: true
                }
              }
            }
          }
        }
      }
    }
  });

  if (!product || !product.inStock) return notFound();

  return (
    <ProductConfiguratorModal
      product={{
        name: product.name,
        description: product.description ?? "",
        ingredients: product.ingredients.map(({ ingredient, isRemovable }) => ({
          name: ingredient.name,
          isRemovable
        })),
        variants: product.variants.map((variant) => ({
          id: variant.id,
          isShowCase: variant.isShowCase,
          weight: variant.weight ?? "",
          price: variant.price,
          imageUrl: variant.imageUrl ?? "",
          options: variant.options as Record<string, string>,
          toppings: variant.toppings.map(({ price, ingredient }) => ({
            price,
            name: ingredient?.name ?? "",
            imageUrl: ingredient?.imageUrl ?? ""
          }))
        }))
      }}
    />
  );
}
