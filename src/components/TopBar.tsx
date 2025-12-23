import type { PropsWithChildren } from "react";
import { cn } from "#/shared/lib/tailwind";
import { Container } from "#/shared/ui";
import { Categories } from "./Categories.tsx";
import { SortPopover } from "./SortPopover.tsx";

/* ===== Typing props ===== */
interface Props extends PropsWithChildren {
  className?: string;
}

/* ===== TopBar component ===== */
export function TopBar({ className }: Props) {
  return (
    <div
      className={cn(
        "sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5",
        className
      )}
    >
      <Container className="flex justify-between">
        <Categories />
        <SortPopover />
      </Container>
    </div>
  );
}
