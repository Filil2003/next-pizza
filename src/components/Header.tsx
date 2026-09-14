import type { ComponentProps } from "react";
import { cn } from "#/shared/lib/tailwind";
import { Container, Logo } from "#/shared/ui";
import { Search } from "./Search";

/* ===== Typing props ===== */
type Props = ComponentProps<"header">;

/* ===== Header component ===== */
export function Header({ className }: Props) {
  return (
    <header className={cn("", className)}>
      <Container className="grid grid-cols-[max-content_1fr] gap-x-10 py-6">
        <Logo />
        <Search />
      </Container>
    </header>
  );
}
