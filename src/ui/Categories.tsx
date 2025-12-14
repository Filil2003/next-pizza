"use client";

import type { PropsWithChildren } from "react";
import { cn } from "#/lib/tailwind";
import { useCategoryStore } from "#/store/category.ts";
import { Button } from "#/ui/Button.tsx";

/* ===== Mock data ===== */
const CATEGORIES = [
  "Пиццы",
  "Комбо",
  "Закуски",
  "Коктейли",
  "Кофе",
  "Напитки",
  "Десерты",
] as const;

/* ===== Typing props ===== */
interface Props extends PropsWithChildren {
  className?: string;
}

/* ===== Categories component ===== */
export function Categories({ className }: Props) {
  const { activeCategory, setActiveCategory } = useCategoryStore();

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {CATEGORIES.map((category) => (
        <Button
          className={cn(
            category === activeCategory &&
              "bg-white shadow-md shadow-gray-200 text-primary",
          )}
          variant="ghost"
          type="link"
          href={`/#${category}`}
          key={category}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
