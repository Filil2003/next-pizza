"use client";

import { parseAsString, useQueryState } from "nuqs";
import {
  type ChangeEvent,
  type PropsWithChildren,
  useCallback,
  useState
} from "react";
import { parseAsSet } from "#/shared/lib/nuqs";
import { cn } from "#/shared/lib/tailwind";
import { Input } from "#/shared/ui";
import { FilterCheckbox } from "./FilterCheckbox.tsx";

/* ===== Typing props ===== */
interface Props extends PropsWithChildren {
  ingredients: {
    label: string;
    value: string;
  }[];
  limit?: number;
  className?: string;
}

/* ===== IngredientsFilter component ===== */
export function IngredientsFilter({
  ingredients,
  limit = 5,
  className
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useQueryState(
    "ingredients",
    parseAsSet(parseAsString).withDefault(new Set())
  );

  const handleCheckedChange = useCallback(
    (value: string) => {
      const newSet = new Set(selectedIngredients);
      if (newSet.has(value)) newSet.delete(value);
      else newSet.add(value);
      void setSelectedIngredients(newSet.size === 0 ? null : newSet);
    },
    [selectedIngredients, setSelectedIngredients]
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newSearchValue = event.currentTarget.value
      .trimStart()
      .replace(/\s{2,}/g, " ");
    setSearchValue(newSearchValue);
  }

  const list = isExpanded
    ? ingredients.filter(({ label }) =>
        label.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    : ingredients.slice(0, limit);

  return (
    <div className={cn("", className)}>
      <p className="font-bold mb-3">
        Ингредиенты
        {selectedIngredients.size > 0 && (
          <span className="ml-2 text-primary bg-primary/10 px-2 py-0.5 rounded-full text-xs">
            {selectedIngredients.size}
          </span>
        )}
      </p>
      {isExpanded && (
        <Input
          value={searchValue}
          onChange={handleChange}
          placeholder="Поиск..."
          className="bg-gray-50 border-none mb-5"
        />
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index.valueOf()}
            label={item.label}
            value={item.value}
            checked={selectedIngredients.has(item.value)}
            onCheckedChange={() => handleCheckedChange(item.value)}
          />
        ))}
      </div>

      {ingredients.length > limit && (
        <div className={isExpanded ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            type="button"
            className="text-primary mt-3"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? "Скрыть" : "+ Показать всё"}
          </button>
        </div>
      )}
    </div>
  );
}
