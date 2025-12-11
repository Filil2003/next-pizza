import type { ComponentProps } from "react";
import { Heading } from "#/ui/Heading.tsx";
import { ProductCard } from "#/ui/ProductCard.tsx";

/* ===== Typing props ===== */
interface Props {
  title: string;
  products: ComponentProps<typeof ProductCard>[];
  className?: string;
}

/* ===== ProductsGroupList component ===== */
export function ProductsGroupList({ title, products, className }: Props) {
  return (
    <div className={className}>
      <Heading as="h2" className="font-extrabold mb-5">
        {title}
      </Heading>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-12">
        {products.map((product) => (
          <ProductCard {...product} key={product.id} price={product.price} />
        ))}
      </div>
    </div>
  );
}
