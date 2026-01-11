import {
  Corner,
  Root,
  Scrollbar,
  Thumb,
  Viewport
} from "@radix-ui/react-scroll-area";
import type { ComponentProps } from "react";
import { cn } from "#/shared/lib/tailwind";

/* ===== Typing props ===== */
interface Props extends ComponentProps<typeof Root> {
  orientation?: "horizontal" | "vertical" | "both";
  className?: string;
}

/* ===== ScrollArea component ===== */
export function ScrollArea({
  className,
  children,
  orientation = "vertical",
  ...restProps
}: Props) {
  return (
    <Root className={cn("", className)} {...restProps}>
      <Viewport className="size-full rounded-[inherit]">{children}</Viewport>
      {/* Horizontal */}
      {(orientation === "horizontal" || orientation === "both") && (
        <Scrollbar
          className="flex touch-none select-none h-5 py-1.5"
          orientation="horizontal"
        >
          <Thumb className="bg-gray-200 hover:bg-gray-300 transition-colors rounded-full" />
        </Scrollbar>
      )}

      {/* Vertical */}
      {(orientation === "vertical" || orientation === "both") && (
        <Scrollbar
          className="flex flex-col touch-none select-none w-5 px-1.5"
          orientation="vertical"
        >
          <Thumb className="bg-gray-200 hover:bg-gray-300 transition-colors rounded-full" />
        </Scrollbar>
      )}
      {orientation === "both" && <Corner />}
    </Root>
  );
}
