"use client";

import {
  type ChangeEvent,
  type ComponentProps,
  type PropsWithChildren,
  useState
} from "react";
import { cn } from "#/shared/lib/tailwind";
import { Input } from "#/shared/ui";
import { FilterCheckbox } from "./FilterCheckbox.tsx";

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
  className
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const list = isExpanded
    ? items.filter(({ label }) =>
        label.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    : defaultItems.slice(0, limit);

  return (
    <div className={cn("", className)}>
      <p className="font-bold mb-3">{title}</p>
      {isExpanded && (
        <Input
          onChange={onInputChange}
          placeholder={searchInputPlaceholder}
          className="bg-gray-50 border-none mb-5"
        />
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index.valueOf()}
            label={item.label}
            value={item.value}
            checked={false}
            onCheckedChange={console.log}
          />
        ))}
      </div>

      {items.length > limit && (
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
