import { Filtration } from "#/components/Filtration";
import { ProductSection } from "#/components/ProductSection";
import { TopBar } from "#/components/TopBar.tsx";
import { capitalize } from "#/shared/lib/string";
import { zen } from "#/shared/lib/zenstack";
import { Container } from "#/shared/ui";

export default async function HomePage() {
  const categoriesRaw = await zen.category.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      name: true,
      slug: true,
      products: {
        orderBy: { createdAt: "asc" },
        select: {
          name: true,
          slug: true,
          inStock: true,
          description: true,
          variants: {
            select: {
              id: true,
              price: true,
              imageUrl: true,
              isShowCase: true
            }
          },
          ingredients: {
            select: {
              ingredient: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }
    }
  });

  const categories = categoriesRaw.map((category) => ({
    name: category.name,
    slug: category.slug,
    products: category.products.map((product) => {
      const minPrice = Math.min(...product.variants.map(({ price }) => price));
      const showCaseVariant =
        product.variants.find(({ isShowCase }) => isShowCase) ??
        // biome-ignore lint/style/noNonNullAssertion: <Guaranteed by the database>
        product.variants[0]!;

      return {
        name: product.name,
        slug: product.slug,
        description:
          product.description ||
          capitalize(
            product.ingredients
              .map(({ ingredient }) => ingredient.name)
              .join(", ")
          ),
        inStock: product.inStock,
        hasVariants: product.variants.length > 1,
        minPrice,
        showCaseVariant: {
          id: showCaseVariant.id,
          imageUrl: showCaseVariant.imageUrl
        }
      };
    })
  }));

  return (
    <>
      <TopBar
        categories={categories.map(({ name, slug }) => ({
          name,
          slug
        }))}
      />

      <Container className="flex gap-14 py-10">
        {/* Filtration */}
        <aside className="basis-[250px] shrink-0">
          <Filtration />
        </aside>

        {/* Feed */}
        <div className="grow flex flex-col gap-24">
          {categories.map((category) => (
            <ProductSection
              id={category.slug}
              key={category.name}
              title={category.name}
              products={category.products}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
