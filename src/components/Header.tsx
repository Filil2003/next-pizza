import { UserIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "#/shared/lib/tailwind";
import { Button, Container, Logo } from "#/shared/ui";
import { Search } from "./Search";

/* ===== Typing props ===== */
type Props = ComponentProps<"header">;

/* ===== Header component ===== */
export function Header({ className }: Props) {
  return (
    <header className={cn("", className)}>
      <Container className="grid grid-cols-[max-content_1fr_auto] gap-x-10 py-6">
        <Logo />
        <Search />
        <div className={cn("flex items-center gap-3", className)}>
          <Button variant="outline" disabled>
            <UserIcon size="16" />
            Войти
          </Button>
        </div>
      </Container>
    </header>
  );
}
