import { CircleCheckBigIcon } from "lucide-react";
import { cn } from "#/shared/lib/tailwind";
import { ImageWithFallback } from "#/shared/ui";

/* ===== Typing props ===== */
interface Props {
  toppings: {
    name: string;
    price: number;
    imageUrl: string;
  }[];
  selected: Set<string>;
  onToggle: (name: string) => void;
  className?: string;
}

/* ===== ToppingsPicker component ===== */
export function ToppingsPicker({
  toppings,
  selected,
  onToggle,
  className
}: Props) {
  return (
    <section className={cn("", className)}>
      <div className="flex items-center gap-2 mb-3 ">
        <h2 className="font-bold text-xl align-middle">Добавить по вкусу</h2>
        {selected.size > 0 && (
          <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-full text-xs">
            {selected.size}
          </span>
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 overflow-visible">
        {toppings.map((topping) => {
          const isSelected = selected.has(topping.name);

          return (
            <button
              key={topping.name}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggle(topping.name)}
              className={cn(
                `
                p-2
                text-sm text-center
                grid grid-rows-[auto_1fr_auto]
                shadow-lg rounded-xl
                border border-transparent
                `,
                {
                  "border-primary": isSelected
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
              <p className="text-base font-bold mt-1">
                {topping.price / 100} ₽
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
