import type { ComponentProps } from "react";
import { cn } from "#/shared/lib/tailwind";
import { ProductCard } from "./ProductCard.tsx";

/* ===== Typing props ===== */
interface Props {
  title: string;
  slug: string;
  products: ComponentProps<typeof ProductCard>[];
  className?: string;
}

/* ===== ProductsGroup component ===== */
export function ProductsGroup({ title, slug, products, className }: Props) {
  return (
    <section id={slug} className={cn("scroll-mt-28", className)}>
      <h2 className="text-3xl font-bold mb-8">{title}</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
        {products.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </section>
  );
}
