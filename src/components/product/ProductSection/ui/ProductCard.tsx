import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { ActionButton } from "./ActionButton.tsx";

/* ===== Typing props ===== */
interface Props {
  name: string;
  slug: string;
  description: string;
  inStock: boolean;
  hasVariants: boolean;
  minPrice: number;
  showCaseVariant: {
    id: string;
    imageUrl: string;
  };
}

/* ===== ProductCard component ===== */
export function ProductCard({
  name,
  slug,
  inStock,
  hasVariants,
  description,
  minPrice,
  showCaseVariant
}: Props) {
  const ariaLabelId = useId();

  return (
    <article className="group flex flex-col relative h-full">
      <Link
        className="absolute inset-0"
        href={`/product/${slug}`}
        aria-labelledby={ariaLabelId}
        draggable={false}
      />
      <div className="relative -z-1 aspect-square bg-secondary rounded-2xl">
        <Image
          className="p-3.5 group-hover:translate-y-1 transition-transform"
          draggable="false"
          src={showCaseVariant.imageUrl}
          alt={name}
          sizes="584px"
          aria-hidden
          fill
        />
      </div>
      <h3 id={ariaLabelId} className="text-xl mb-1 mt-3 font-bold">
        {name}
      </h3>
      <p className={"text-sm font-medium text-gray-500 mb-4"}>{description}</p>
      <footer className="flex justify-between items-center mt-auto">
        <span className="text-lg">
          от <b>{minPrice / 100} ₽</b>
        </span>
        <ActionButton
          slug={slug}
          showCaseVariantId={showCaseVariant.id}
          inStock={inStock}
          hasVariants={hasVariants}
        />
      </footer>
    </article>
  );
}
