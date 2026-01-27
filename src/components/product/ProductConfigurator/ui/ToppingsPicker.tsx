import { CircleCheckBigIcon } from "lucide-react";
import { cn } from "#/shared/lib/tailwind";
import { ImageWithFallback, Price } from "#/shared/ui";

/* ===== Typing props ===== */
interface Props {
  toppings: {
    name: string;
    price: number;
    imageUrl: string;
  }[];
  toppingsLimit: number | null;
  selected: Set<string>;
  onToggle: (name: string) => void;
  className?: string;
}

/* ===== ToppingsPicker component ===== */
export function ToppingsPicker({
  toppings,
  toppingsLimit,
  selected,
  onToggle,
  className
}: Props) {
  return (
    <section className={cn("", className)}>
      <div className="flex items-center gap-2">
        <h2 className="font-bold text-xl align-middle">Добавить по вкусу</h2>
        {selected.size > 0 && (
          <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-full text-xs">
            {selected.size}
          </span>
        )}
      </div>
      {toppingsLimit && (
        <p className="text-sm text-gray-500">
          Можно выбрать не больше {toppingsLimit}
        </p>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 overflow-visible mt-3">
        {toppings.map((topping) => {
          const isSelected = selected.has(topping.name);
          const isDisabled = !isSelected && selected.size === toppingsLimit;

          return (
            <button
              key={topping.name}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggle(topping.name)}
              disabled={isDisabled}
              className={cn(
                `
                p-2
                text-sm text-center
                grid grid-rows-[auto_1fr_auto]
                rounded-xl
                border border-transparent
                transition-all
                `,
                {
                  "grayscale-100 cursor-not-allowed ": isDisabled,
                  "border-primary": isSelected,
                  "shadow-lg": !isSelected
                }
              )}
            >
              <div className="relative aspect-square w-full self-start mx-auto">
                <ImageWithFallback
                  className="object-contain pointer-events-none"
                  src={topping.imageUrl}
                  alt={topping.name}
                  fallbackSrc="/pizza/ingredients/placeholder.svg"
                  sizes="100px"
                  fill
                />
                {isSelected && (
                  <CircleCheckBigIcon className="absolute right-1 top-1 stroke-primary fill-white" />
                )}
              </div>

              <p className="leading-4">{topping.name}</p>
              <Price
                className="text-base font-bold mt-1"
                amount={topping.price}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
