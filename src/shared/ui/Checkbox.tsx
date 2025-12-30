import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "#/shared/lib/tailwind";

/* ===== Typing props ===== */
type Props = ComponentProps<typeof CheckboxPrimitive.Root>;

/* ===== Checkbox component ===== */
export function Checkbox({ className, ...restProps }: Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        `
        group
        size-4
        rounded-sm
        bg-gray-100 data-[state=checked]:bg-primary
        border border-gray-200 hover:border-primary data-[state=checked]:border-primary
        disabled:cursor-not-allowed disabled:opacity-50
        transition-all duration-200
      `,
        className
      )}
      {...restProps}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center"
      >
        <CheckIcon className="size-3.5 text-primary-foreground" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
