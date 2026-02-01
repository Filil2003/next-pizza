import type { ComponentProps } from "react";
import { cn } from "#/shared/lib/tailwind";
import { Button } from "#/shared/ui";
import { useFormContext } from "./context.tsx";

/* ===== Typing props ===== */
interface Props extends ComponentProps<"button"> {
  className?: string;
}

/* ===== SubmitButton component ===== */
export function SubmitButton({ className, children, ...restProps }: Props) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          className={cn("", className)}
          {...restProps}
          type="submit"
          loading={isSubmitting}
        >
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
}
