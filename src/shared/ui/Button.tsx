"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { useAppearanceDelay } from "#/shared/lib/react";
import { cn } from "#/shared/lib/tailwind";

const variants = cva(
  `
  w-fit h-fit
  inline-flex items-center justify-center
  text-sm font-bold whitespace-nowrap
  rounded-full
  transition-colors
  has-[svg]:gap-1
  not-disabled:active:translate-y-px
  disabled:cursor-not-allowed
  disabled:text-gray-400
  disabled:bg-gray-200
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
        `
      },
      size: {
        sm: "mh-9 px-3",
        md: "mh-10 px-4 py-2",
        lg: "mh-11 px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

/* ===== Typing props ===== */
type CommonProps = VariantProps<typeof variants>;

type ButtonSpecificProps = ComponentProps<"button"> & {
  loading?: boolean;
};

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
  const classNames = cn(variants({ variant, size }), className);

  if (restProps.type === "link") {
    const { type: _, ...linkProps } = restProps;
    return (
      <Link className={classNames} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <ExtendedButton className={classNames} {...restProps}>
      {children}
    </ExtendedButton>
  );
}

function ExtendedButton({
  children,
  className,
  disabled,
  loading = false,
  ...restProps
}: ButtonSpecificProps) {
  const delayedLoading = useAppearanceDelay(loading, {
    appearanceDelay: 300,
    minDisplayTime: 600
  });

  return (
    <button
      className={cn(className, "relative", {
        "disabled:cursor-wait": delayedLoading
      })}
      type="button"
      disabled={disabled || delayedLoading}
      {...restProps}
    >
      {delayedLoading && (
        <LoaderCircleIcon className="absolute animate-spin" aria-hidden />
      )}
      {delayedLoading ? (
        <span className="text-transparent">{children}</span>
      ) : (
        children
      )}
    </button>
  );
}
