"use client";

import type { ComponentProps } from "react";
import { InView } from "react-intersection-observer";
import { Heading } from "#/shared/ui";
import { useCategoryStore } from "#/store/category.ts";
import { ProductCard } from "./ProductCard.tsx";

/* ===== Typing props ===== */
interface Props {
  title: string;
  products: ComponentProps<typeof ProductCard>[];
  className?: string;
}

/* ===== ProductsGroupList component ===== */
export function ProductsGroupList({ title, products, className }: Props) {
  const { setActiveCategory } = useCategoryStore();

  return (
    <InView
      className={className}
      as="section"
      id={title}
      rootMargin="-50% 0px -50% 0px"
      onChange={(inView) => {
        if (inView) setActiveCategory(title);
      }}
    >
      <Heading as="h2" className="font-extrabold mb-5">
        {title}
      </Heading>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-12">
        {products.map((product) => (
          <ProductCard {...product} key={product.name} price={product.price} />
        ))}
      </div>
    </InView>
  );
}
