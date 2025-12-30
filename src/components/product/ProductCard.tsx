import { Plus } from "lucide-react";
import Image from "next/image";
import type { PropsWithChildren } from "react";
import type { IngredientDto } from "#/shared/dto";
import { capitalize } from "#/shared/lib/string";
import { cn } from "#/shared/lib/tailwind";
import { Button, Heading } from "#/shared/ui";

/* ===== Typing props ===== */
interface Props extends PropsWithChildren {
  name: string;
  ingredients: IngredientDto[];
  price: number;
  imageUrn: string;
  className?: string;
}

/* ===== ProductCard component ===== */
export function ProductCard({
  name,
  ingredients,
  price,
  imageUrn,
  className
}: Props) {
  const ingredientsString = capitalize(
    ingredients.map(({ name }) => name).join(", ")
  );
  return (
    <article className={cn("flex flex-col", className)}>
      <div className="relative aspect-square bg-secondary rounded-2xl">
        <Image className="p-3.5" src={imageUrn} alt={name} sizes="584px" fill />
      </div>
      <Heading as="h4" className="mb-1 mt-3 font-bold">
        {name}
      </Heading>
      <p className="text-sm text-gray-500 mb-auto">{ingredientsString}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-[20px]">
          от <b>{price} ₽</b>
        </span>
        <Button variant="secondary">
          <Plus className="mr-1" size={20} />
          Добавить
        </Button>
      </div>
    </article>
  );
}
