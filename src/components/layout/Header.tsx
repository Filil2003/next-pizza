import { UserIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { CartButton } from "#/components/checkout";
import { cn } from "#/shared/lib/tailwind";
import { Button, Container, Logo } from "#/shared/ui";
import { Search } from "../navigation";

/* ===== Typing props ===== */
type Props = ComponentProps<"header">;

/* ===== Header component ===== */
export function Header({ className }: Props) {
  return (
    <header className={cn("border-b-2", className)}>
      <Container className="grid grid-cols-[auto_1fr_auto] gap-x-10 py-8">
        {/* Left side */}
        <Logo />

        {/* Middle side */}
        <Search />

        {/* Right side */}
        <div className={cn("flex items-center gap-3", className)}>
          <Button variant="outline">
            <UserIcon size="16" />
            Войти
          </Button>
          <CartButton />
        </div>
      </Container>
    </header>
  );
}
