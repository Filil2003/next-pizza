import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import { cn } from "#/shared/lib/tailwind";

/* ===== Typing props ===== */
interface Props {
  ingredients: {
    name: string;
    isRemovable: boolean;
  }[];
  excluded: Set<string>;
  onToggle: (name: string) => void;
  className?: string;
}

/* ===== IngredientsExcluder component ===== */
export function IngredientsExcluder({
  ingredients,
  excluded,
  onToggle,
  className
}: Props) {
  return (
    <section className={cn("", className)}>
      <h2 className="sr-only">Ингредиенты</h2>
      <ul
        className={`
        text-sm
        flex flex-wrap
        gap-x-[0.5cap]
        [&>li:not(:last-child)::after]:content-[',']
        [&>li:first-child_span,&>li:first-child]:first-letter:uppercase
        lowercase
        `}
      >
        {ingredients.map(({ name, isRemovable }) => {
          if (isRemovable) {
            const isRemoved = excluded.has(name);

            return (
              <li key={name}>
                <button
                  type="button"
                  aria-pressed={isRemoved}
                  className={cn(
                    "[text-transform:inherit] inline-flex items-center gap-1 underline decoration-dotted underline-offset-4",
                    {
                      "line-through decoration-solid": isRemoved
                    }
                  )}
                  onClick={() => onToggle(name)}
                >
                  <span>{name}</span>
                  {isRemoved ? (
                    <PlusCircleIcon className="size-[1.25cap] stroke-gray-500" />
                  ) : (
                    <MinusCircleIcon className="size-[1.25cap] stroke-gray-500" />
                  )}
                </button>
              </li>
            );
          }

          return <li key={name}>{name}</li>;
        })}
      </ul>
    </section>
  );
}
