"use client";

import {
  type ChangeEvent,
  type ComponentProps,
  type PropsWithChildren,
  useState,
} from "react";
import { cn } from "#/lib/tailwind";
import { FilterCheckbox } from "#/ui/FilterCheckbox.tsx";
import { Input } from "#/ui/Input.tsx";

/* ===== Typing props ===== */
interface Props extends PropsWithChildren {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (values: string[]) => void;
  defaultValue?: string[];
  className?: string;
}

type Item = ComponentProps<typeof FilterCheckbox>;

/* ===== CheckboxFiltersGroup component ===== */
export function CheckboxFiltersGroup({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  className,
}: Props) {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const list = showAll
    ? items.filter(({ label }) =>
        label.toLowerCase().startsWith(searchValue.toLowerCase()),
      )
    : defaultItems.slice(0, limit);

  return (
    <div className={cn("", className)}>
      <p className="font-bold mb-3">{title}</p>
      {showAll && (
        <Input
          onChange={onInputChange}
          placeholder={searchInputPlaceholder}
          className="bg-gray-50 border-none mb-5"
        />
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto">
        {list.map((item, index) => (
          <FilterCheckbox
            // biome-ignore lint/suspicious/noArrayIndexKey: <Static list>
            key={index}
            label={item.label}
            value={item.value}
            checked={false}
            onCheckedChange={console.log}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            type="button"
            className="text-primary mt-3"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Скрыть" : "+ Показать всё"}
          </button>
        </div>
      )}
    </div>
  );
}
