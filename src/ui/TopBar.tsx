import type { PropsWithChildren } from "react";
import { cn } from "#/lib/tailwind";
import { Categories } from "#/ui/Categories.tsx";
import { Container } from "#/ui/Container.tsx";
import { SortPopover } from "#/ui/SortPopover.tsx";

/* ===== Typing props ===== */
interface Props extends PropsWithChildren {
  className?: string;
}

/* ===== TopBar component ===== */
export const TopBar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5",
        className,
      )}
    >
      <Container className="flex justify-between">
        <Categories />
        <SortPopover />
      </Container>
    </div>
  );
};
