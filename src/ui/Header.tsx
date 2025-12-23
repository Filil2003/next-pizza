import { ArrowRight, ShoppingCartIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import type { ComponentProps } from "react";
import { cn } from "#/lib/tailwind";
import { Button } from "#/ui/Button.tsx";
import { Container } from "#/ui/Container.tsx";
import { Search } from "#/ui/Search.tsx";

/* ===== Typing props ===== */
type Props = ComponentProps<"header">;

/* ===== Header component ===== */
export function Header({ className }: Props) {
  return (
    <header className={cn("border-b-2", className)}>
      <Container className="grid grid-cols-[auto_1fr_auto] gap-x-10 py-8">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo" width="35" height="35" />
          <div>
            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
            <p className="text-sm text-gray-400 leading-3">
              вкусней уже некуда
            </p>
          </div>
        </div>
        {/* Middle side */}
        <Search />

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <UserIcon size="16" />
            Войти
          </Button>
          <Button className="group grid grid-cols-[repeat(3,auto)]">
            <b>520 ₽</b>
            <span className="h-full w-px bg-white/30 mx-3" />
            <div className="flex items-center gap-1 transition-opacity duration-300 group-hover:opacity-0 col-start-3 row-start-1">
              <ShoppingCartIcon size="16" strokeWidth="2" />
              <b>3</b>
            </div>
            <ArrowRight
              size={20}
              className="transition duration-300 opacity-0 group-hover:opacity-100 col-start-3 row-start-1 -translate-x-2 group-hover:translate-x-0 justify-self-center"
            />
          </Button>
        </div>
      </Container>
    </header>
  );
}
