import { Plus } from "lucide-react";
import Image from "next/image";
import type { PropsWithChildren } from "react";
import { cn } from "#/lib/tailwind";
import { Button } from "#/ui/Button.tsx";
import { Heading } from "#/ui/Heading.tsx";

/* ===== Typing props ===== */
interface Props extends PropsWithChildren {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  className?: string;
}

/* ===== ProductCard component ===== */
export function ProductCard({
  name,
  description,
  price,
  imageUrl,
  className,
}: Props) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="relative aspect-square bg-secondary rounded-2xl">
        <Image className="p-3.5" src={imageUrl} alt={name} sizes="584px" fill />
      </div>
      <Heading as="h4" className="mb-1 mt-3 font-bold">
        {name}
      </Heading>
      <p className="text-sm text-gray-400 mb-auto">{description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-[20px]">
          от <b>{price} ₽</b>
        </span>
        <Button variant="secondary">
          <Plus className="mr-1" size={20} />
          Добавить
        </Button>
      </div>
    </div>
  );
}
