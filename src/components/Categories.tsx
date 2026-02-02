"use client";

import type { ComponentProps } from "react";
import { useScrollSpy } from "#/shared/lib/react";
import { cn } from "#/shared/lib/tailwind";
import { Button } from "#/shared/ui";

/* ===== Typing props ===== */
interface Props extends ComponentProps<"div"> {
  categories: {
    name: string;
    slug: string;
  }[];
}

/* ===== Categories component ===== */
export function Categories({ categories, className, ...restProps }: Props) {
  const categoriesId = categories.map(({ slug }) => slug);
  const { activeId, scrollToId } = useScrollSpy(categoriesId);
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-full", className)}
      {...restProps}
    >
      {categories.map(({ slug, name }) => (
        <Button
          className={cn("text-sm ", {
            "bg-white shadow-md shadow-gray-200 text-primary": slug === activeId
          })}
          variant="ghost"
          type="link"
          href={`/#${slug}`}
          key={slug}
          onClick={() => scrollToId(slug)}
        >
          {name}
        </Button>
      ))}
    </div>
  );
}
