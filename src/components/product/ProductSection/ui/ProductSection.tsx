import type { ComponentProps } from "react";
import { cn } from "#/shared/lib/tailwind";
import { ProductCard } from "./ProductCard.tsx";

/* ===== Typing props ===== */
interface Props extends ComponentProps<"section"> {
  title: string;
  products: ComponentProps<typeof ProductCard>[];
}

/* ===== ProductSection component ===== */
export function ProductSection({
  title,
  products,
  className,
  ...restProps
}: Props) {
  return (
    <section className={cn("scroll-mt-28", className)} {...restProps}>
      <h2 className="text-3xl font-bold mb-8">{title}</h2>

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
        {products.map((product) => (
          <li key={product.name}>
            <ProductCard {...product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
