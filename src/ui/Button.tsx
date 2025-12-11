import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "#/lib/tailwind";

const variants = cva(
  `
  inline-flex items-center justify-center
  text-sm font-medium whitespace-nowrap
  rounded-xl
  transition-colors
  active:translate-y-[1px]
  has-[svg]:gap-1
  `,
  {
    variants: {
      variant: {
        primary: `
          bg-primary hover:bg-primary/90
          text-primary-foreground
        `,
        secondary: `
          bg-secondary hover:bg-secondary/50
          text-primary
        `,
        outline: `
          bg-transparent hover:bg-secondary
          text-primary
          border border-primary
        `,
        ghost: `
          hover:bg-secondary
          hover:text-secondary-foreground
        `,
      },
      size: {
        sm: "mh-9 px-3",
        md: "mh-10 px-4 py-2",
        lg: "mh-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

/* ===== Typing props ===== */
type CommonProps = VariantProps<typeof variants>;

type ButtonSpecificProps = ComponentProps<"button">;

type LinkSpecificProps = ComponentProps<typeof Link> & {
  type: "link";
};

type Props = CommonProps & (ButtonSpecificProps | LinkSpecificProps);

/* ===== Button component ===== */
export function Button({
  variant,
  size,
  className,
  children,
  ...restProps
}: Props) {
  const classNames = cn(variants({ variant, size, className }));

  if (restProps.type === "link") {
    const { type: _, ...linkProps } = restProps;
    return (
      <Link className={classNames} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classNames} type="button" {...restProps}>
      {children}
    </button>
  );
}
