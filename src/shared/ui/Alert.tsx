import { cva, type VariantProps } from "class-variance-authority";
import {
  CircleCheckIcon,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon
} from "lucide-react";
import type { PropsWithChildren } from "react";
import { cn } from "#/shared/lib/tailwind";

const variants = cva("flex items-center gap-2 text-secondary p-3 rounded-lg", {
  variants: {
    type: {
      success: "bg-emerald-50 text-emerald-900 border border-emerald-200",
      info: "bg-blue-50 text-blue-900 border border-blue-200",
      warning: "bg-amber-50 text-amber-900 border border-amber-200",
      error: "bg-red-50 text-red-900 border border-red-200"
    }
  }
});

const icons = {
  success: CircleCheckIcon,
  info: InfoIcon,
  warning: TriangleAlertIcon,
  error: OctagonXIcon
} as const;

/* ===== Typing props ===== */
interface Props extends PropsWithChildren, VariantProps<typeof variants> {
  type: NonNullable<VariantProps<typeof variants>["type"]>;
  className?: string;
}

/* ===== Alert component ===== */
export function Alert({ type = "info", className, children }: Props) {
  const Icon = icons[type];

  return (
    <p className={cn(variants({ type }), className)}>
      <Icon />
      <span>{children}</span>
    </p>
  );
}
