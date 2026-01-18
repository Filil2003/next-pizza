import { Services } from "#/services";
import { IngredientsFilter } from "./IngredientsFilter.tsx";
import { PriceFilter } from "./PriceFilter.tsx";

/* ===== Typing props ===== */
interface Props {
  className?: string;
}

/* ===== Filtration component ===== */
export async function Filtration({ className }: Props) {
  const ingredients = await Services.ingredient.getAll();

  return (
    <aside className={className}>
      <h4 className="text-2xl mb-5 font-bold">Фильтрация</h4>

      <PriceFilter />

      <IngredientsFilter
        className="mt-5 border-y border-y-neutral-100 py-6"
        ingredients={ingredients.map(({ name, id }) => ({
          label: name,
          value: id
        }))}
      />
    </aside>
  );
}
