import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "#/shared/ui";

/* ===== Typing props ===== */
interface Props {
  name: string;
  slug: string;
  showCaseImageUrl: string;
  description: string;
  minPrice: number;
}

/* ===== ProductCard component ===== */
export function ProductCard({
  name,
  slug,
  description,
  minPrice,
  showCaseImageUrl
}: Props) {
  return (
    <Link href={`/product/${slug}`} draggable="false">
      <article className="flex flex-col h-full">
        <div className="relative aspect-square bg-secondary rounded-2xl">
          <Image
            className="p-3.5 hover:translate-y-1 transition-transform"
            draggable="false"
            src={showCaseImageUrl}
            alt={name}
            sizes="584px"
            fill
          />
        </div>
        <h3 className="text-xl mb-1 mt-3 font-bold">{name}</h3>
        <p className={"text-sm font-medium text-gray-500 mb-4"}>
          {description}
        </p>
        <footer className="flex justify-between items-center mt-auto">
          <span className="text-lg">
            от <b>{minPrice / 100} ₽</b>
          </span>
          <Button className="font-semibold text-base" variant="secondary">
            <Plus className="mr-1" size={20} />
            Добавить
          </Button>
        </footer>
      </article>
    </Link>
  );
}
