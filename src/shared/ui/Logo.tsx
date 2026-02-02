import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "#/shared/lib/tailwind";

/* ===== Typing props ===== */
type Props = Omit<ComponentProps<typeof Link>, "href">;

/* ===== Logo component ===== */
export function Logo({ className }: Props) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-4", className)}
      aria-label="Перейти на главную страницу"
    >
      <Image width={36} height={36} src="/logo.png" alt="Логотип" aria-hidden />
      <div>
        <h1 className="text-[22px] uppercase font-black">Next Pizza</h1>
        <p className="text-sm text-gray-400 leading-3">вкуснее уже некуда</p>
      </div>
    </Link>
  );
}
