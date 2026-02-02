import type { ComponentProps } from "react";
import { cn } from "#/shared/lib/tailwind";
import { Container } from "#/shared/ui";
import { Categories } from "./Categories";
import { CartButton } from "./checkout";

/* ===== Typing props ===== */
interface Props extends ComponentProps<"div"> {
  categories: ComponentProps<typeof Categories>["categories"];
}

/* ===== TopBar component ===== */
export async function TopBar({ categories, className, ...restProps }: Props) {
  return (
    <div
      className={cn(
        "sticky top-0 z-10 bg-white/80 backdrop-blur-xl backdrop-filter py-2 ",
        className
      )}
      {...restProps}
    >
      <Container className="flex items-center justify-between">
        <Categories categories={categories} />
        <CartButton />
      </Container>
    </div>
  );
}
