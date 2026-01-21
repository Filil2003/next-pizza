import slugify from "slugify";
import { zen } from "#/shared/lib/zenstack";
import seedData from "./data";

async function seed() {
  /* ===== Cleanup ===== */
  await zen.productVariant.deleteMany();
  await zen.productIngredient.deleteMany();
  await zen.productVariantTopping.deleteMany();
  await zen.ingredient.deleteMany();
  await zen.product.deleteMany();
  await zen.category.deleteMany();

  /* ===== Ingredient ===== */
  for (const ingredientData of seedData.ingredientsData) {
    await zen.ingredient.create({
      data: {
        name: ingredientData.name,
        imageUrl: `/ingredients/${slugifyStr(ingredientData.name)}.png`
      }
    });
  }

  for (const categoryData of seedData.categoriesData) {
    /* ===== Category ===== */
    const category = await zen.category.create({
      data: {
        name: categoryData.title,
        slug: slugifyStr(categoryData.title)
      }
    });

    for (const productData of categoryData.products) {
      /* ===== Product ===== */
      const product = await zen.product.create({
        data: {
          name: productData.name,
          slug: slugifyStr(productData.name),
          description: productData.description ?? "",
          categories: { connect: { id: category.id } }
        }
      });

      /* ===== ProductIngredient ===== */
      if (productData.ingredients) {
        for (const ing of productData.ingredients) {
          const ingredient = await zen.ingredient.findUnique({
            where: { name: ing.name }
          });

          if (ingredient) {
            await zen.productIngredient.create({
              data: {
                productId: product.id,
                ingredientId: ingredient.id,
                isRemovable: ing.isRemovable
              }
            });
          }
        }
      }

      /* ===== ProductVariant ===== */
      for (const variantData of productData.variants) {
        const variant = await zen.productVariant.create({
          data: {
            id: variantData.id,
            product: { connect: { id: product.id } },
            weight: variantData.weight,
            price: variantData.price,
            isShowCase: variantData.isShowCase,
            imageUrl: `/${category.slug}/${product.slug}/${variantData.id}.png`,
            options: variantData.options,
            toppingsLimit: variantData.toppingsLimit
          }
        });

        /* ===== ProductVariantTopping ===== */
        if (variantData.toppings) {
          for (const topping of variantData.toppings) {
            const ingredient = await zen.ingredient.findUnique({
              where: { name: topping.name }
            });

            if (ingredient) {
              await zen.productVariantTopping.create({
                data: {
                  productVariantId: variant.id,
                  ingredientId: ingredient.id,
                  price: topping.price
                }
              });
            }
          }
        }
      }
    }
  }
}

void seed();

/* ===== Helpers ===== */
function slugifyStr(str: string) {
  return slugify(str, { lower: true, strict: true, locale: "ru" });
}
