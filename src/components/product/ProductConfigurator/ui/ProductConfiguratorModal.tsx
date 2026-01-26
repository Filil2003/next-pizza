"use client";

import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { cn } from "#/shared/lib/tailwind";
import { Dialog, DialogContent } from "#/shared/ui";
import { ProductConfigurator } from "./ProductConfigurator.tsx";

/* ===== Typing props ===== */
interface Props {
  product: ComponentProps<typeof ProductConfigurator>["product"];
  className?: string;
}

/* ===== ProductConfiguratorModal component ===== */
export function ProductConfiguratorModal({ product, className }: Props) {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn("", className)}>
        <ProductConfigurator product={product} />
      </DialogContent>
    </Dialog>
  );
}
