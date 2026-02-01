import type { ComponentProps } from "react";
import { cn } from "#/shared/lib/tailwind";

/* ===== Typing props ===== */
interface Props extends ComponentProps<"hr"> {
  orientation?: "horizontal" | "vertical";
  isDecorative?: boolean;
}

/* ===== Separator component ===== */
export function Separator({
  orientation = "horizontal",
  isDecorative = true,
  className,
  ...restProps
}: Props) {
  return (
    <hr
      className={cn(
        "bg-current/30",
        {
          "h-px w-full": orientation === "horizontal",
          "w-px h-full": orientation === "vertical"
        },
        className
      )}
      role={isDecorative ? "none" : "separator"}
      aria-orientation={orientation}
      {...restProps}
    />
  );
}
