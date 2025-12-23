import type { PropsWithChildren } from "react";
import { cn } from "#/shared/lib/tailwind";

/* ===== Typing props ===== */
interface Props extends PropsWithChildren {
  className?: string;
}

/* ===== Container component ===== */
export function Container({ className, children }: Props) {
  return <div className={cn("mx-auto max-w-7xl", className)}>{children}</div>;
}
