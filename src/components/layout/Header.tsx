import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { CartButton } from "#/components/checkout";
import { cn } from "#/shared/lib/tailwind";
import { Button, Container } from "#/shared/ui";
import { Search } from "../navigation";

/* ===== Typing props ===== */
type Props = ComponentProps<"header">;

/* ===== Header component ===== */
export function Header({ className }: Props) {
  return (
    <header className={cn("border-b-2", className)}>
      <Container className="grid grid-cols-[auto_1fr_auto] gap-x-10 py-8">
        {/* Left side */}
        <Link href="/" className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo" width="35" height="35" />
          <div>
            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
            <p className="text-sm text-gray-400 leading-3">
              вкусней уже некуда
            </p>
          </div>
        </Link>
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
