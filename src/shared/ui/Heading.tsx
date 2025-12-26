import { type ComponentProps, createElement } from "react";
import { cn } from "#/shared/lib/tailwind";

/* ===== Typing props ===== */
type HeadingTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type Props<T extends HeadingTags> = ComponentProps<T> & {
  as?: T | undefined;
};

/* ===== Heading component ===== */
export function Heading<T extends HeadingTags = "h1">({
  as,
  className,
  children,
  ...restProps
}: Props<T>) {
  const mapSizeByTag = {
    h6: "text-[16px]",
    h5: "text-[22px]",
    h4: "text-[26px]",
    h3: "text-[32px]",
    h2: "text-[40px]",
    h1: "text-[48px]"
  } as const;

  const Tag: HeadingTags = as ?? "h1";
  const classNames = cn(mapSizeByTag[Tag], "leading-[1.2]", className);

  return createElement(Tag, { ...restProps, className: classNames }, children);
}
