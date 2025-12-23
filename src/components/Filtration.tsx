import type { PropsWithChildren } from "react";
import { Heading, Input, RangeSlider } from "#/shared/ui";
import { CheckboxFiltersGroup } from "./CheckboxFiltersGroup.tsx";
import { FilterCheckbox } from "./FilterCheckbox.tsx";

/* ===== Typing props ===== */
interface Props extends PropsWithChildren {
  className?: string;
}

/* ===== Filtration component ===== */
export function Filtration({ className }: Props) {
  return (
    <div className={className}>
      <Heading as="h4" className="mb-5 font-bold">
        Фильтрация
      </Heading>

      <div className="flex flex-col gap-4 select-none">
        <FilterCheckbox label="Можно собирать" value="1" />
        <FilterCheckbox label="Новинки" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min="0"
            max="1000"
            defaultValue="0"
          />
          <Input type="number" placeholder="1000" min="100" max="1000" />
        </div>

        <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />

        <CheckboxFiltersGroup
          title="Ингредиенты"
          className="mt-5"
          limit={2}
          defaultItems={[
            {
              label: "Сырный соус",
              value: "1"
            },
            {
              label: "Моцарелла",
              value: "2"
            },
            {
              label: "Чеснок",
              value: "3"
            },
            {
              label: "Солёные огурчики",
              value: "4"
            },
            {
              label: "Красный лук",
              value: "5"
            },
            {
              label: "Томаты",
              value: "6"
            }
          ]}
          items={[
            {
              label: "Сырный соус",
              value: "1"
            },
            {
              label: "Моцарелла",
              value: "2"
            },
            {
              label: "Чеснок",
              value: "3"
            },
            {
              label: "Солёные огурчики",
              value: "4"
            },
            {
              label: "Красный лук",
              value: "5"
            },
            {
              label: "Томаты",
              value: "6"
            }
          ]}
        />
      </div>
    </div>
  );
}
