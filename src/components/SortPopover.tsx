import { ArrowUpDown } from "lucide-react";
import type { PropsWithChildren } from "react";
import { cn } from "#/shared/lib/tailwind";
import { Button } from "#/shared/ui";

/* ===== Mock data ===== */
const FILTERS = ["популярное", "новинки"] as const;

/* ===== Typing props ===== */
interface Props extends PropsWithChildren {
  className?: string;
}

/* ===== SortPopover component ===== */
export function SortPopover({ className }: Props) {
  return (
    <Button variant="ghost" className={cn("bg-gray-50", className)}>
      <ArrowUpDown size="16" />
      <span className="font-bold">Сортировка:</span>
      <span className="text-primary">{FILTERS.at(0)}</span>
    </Button>
  );
}
