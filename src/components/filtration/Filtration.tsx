import { Services } from "#/services";
import { Heading } from "#/shared/ui";
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
      <Heading as="h4" className="mb-5 font-bold">
        Фильтрация
      </Heading>

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
