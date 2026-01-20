"use client";

import { cn } from "#/shared/lib/tailwind";
import { Button } from "#/shared/ui";
import { useCategoryStore } from "#/store/category.ts";

/* ===== Typing props ===== */
interface Props {
  categories: {
    name: string;
    slug: string;
  }[];
  className?: string;
}

/* ===== Categories component ===== */
export function Categories({ categories, className }: Props) {
  const { activeCategory, setActiveCategory } = useCategoryStore();

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categories.map(({ slug, name }) => (
        <Button
          className={cn(
            slug === activeCategory &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          variant="ghost"
          type="link"
          href={`/#${slug}`}
          key={slug}
          onClick={() => setActiveCategory(slug)}
        >
          {name}
        </Button>
      ))}
    </div>
  );
}
