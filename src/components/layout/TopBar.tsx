"use server";

import type { ComponentProps } from "react";
import { SortPopover } from "#/components/filtration";
import { Categories } from "#/components/navigation";
import { cn } from "#/shared/lib/tailwind";
import { Container } from "#/shared/ui";

/* ===== Typing props ===== */
interface Props {
  categories: ComponentProps<typeof Categories>["categories"];
  className?: string;
}

/* ===== TopBar component ===== */
export async function TopBar({ categories, className }: Props) {
  return (
    <div
      className={cn(
        "sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5",
        className
      )}
    >
      <Container className="flex justify-between">
        <Categories categories={categories} />
        <SortPopover />
      </Container>
    </div>
  );
}
