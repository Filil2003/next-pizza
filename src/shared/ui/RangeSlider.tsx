import * as SliderPrimitive from "@radix-ui/react-slider";
import { type ComponentProps, Fragment, type ReactNode } from "react";
import { cn } from "#/shared/lib/tailwind";

/* ===== Typing props ===== */
interface Props extends ComponentProps<typeof SliderPrimitive.Root> {
  labelPosition?: "top" | "bottom";
  label?: (value: number | undefined) => ReactNode;
}

/* ===== Slider component ===== */
export function RangeSlider({
  className,
  label,
  labelPosition = "bottom",
  ...restProps
}: Props) {
  const initialValue = Array.isArray(restProps.value)
    ? restProps.value
    : [restProps.min, restProps.max];

  return (
    <SliderPrimitive.Root
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...restProps}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {initialValue.map((value, index) => (
        <Fragment key={index.valueOf()}>
          <SliderPrimitive.Thumb className="relative block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            {label && (
              <span
                className={cn(
                  "absolute flex w-full justify-center",
                  labelPosition === "top" && "-top-7",
                  labelPosition === "bottom" && "top-4"
                )}
              >
                {label(value)}
              </span>
            )}
          </SliderPrimitive.Thumb>
        </Fragment>
      ))}
    </SliderPrimitive.Root>
  );
}
