"use client";

import { parseAsInteger, useQueryStates } from "nuqs";
import type { ComponentProps } from "react";
import { cn } from "#/shared/lib/tailwind";
import { Input, RangeSlider } from "#/shared/ui";

/* ===== Constants ===== */
const DEFAULT_PRICE_RANGE = { from: 0, to: 1000 };
const PRICE_STEP = 10;

/* ===== Typing props ===== */
interface Props extends ComponentProps<"section"> {
  className?: string;
}

/* ===== PriceFilter component ===== */
export function PriceFilter({ className }: Props) {
  const [{ from, to }, setPrice] = useQueryStates({
    from: parseAsInteger.withDefault(0),
    to: parseAsInteger.withDefault(1000)
  });

  return (
    <section className={cn("py-6 pb-7", className)}>
      <p className="font-bold mb-3">Цена от и до:</p>
      <div className="flex gap-3 mb-5">
        <Input
          aria-label="Price from"
          type="number"
          placeholder={String(DEFAULT_PRICE_RANGE.from)}
          min={DEFAULT_PRICE_RANGE.from}
          max={DEFAULT_PRICE_RANGE.to}
          step={PRICE_STEP}
          value={String(from)}
          onChange={({ currentTarget }) =>
            setPrice({ from: Number(currentTarget.value) })
          }
        />
        <Input
          aria-label="Price to"
          type="number"
          placeholder={String(DEFAULT_PRICE_RANGE.to)}
          min={DEFAULT_PRICE_RANGE.from}
          max={DEFAULT_PRICE_RANGE.to}
          step={PRICE_STEP}
          value={String(to)}
          onChange={({ currentTarget }) =>
            setPrice({ to: Number(currentTarget.value) })
          }
        />
      </div>
      <RangeSlider
        aria-label="Select price range"
        min={DEFAULT_PRICE_RANGE.from}
        max={DEFAULT_PRICE_RANGE.to}
        step={PRICE_STEP}
        value={[from, to]}
        onValueChange={(values) => {
          const [from, to] = values as [number, number];
          void setPrice({ from, to });
        }}
      />
    </section>
  );
}
