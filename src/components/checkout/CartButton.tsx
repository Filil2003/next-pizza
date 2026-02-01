"use client";

import {
  ArrowLeft,
  ArrowRight,
  InfoIcon,
  ShoppingCartIcon
} from "lucide-react";
import Image from "next/image";
import { Toaster } from "sonner";
import { cn } from "#/shared/lib/tailwind";
import { Button, Price, ScrollArea, Sheet } from "#/shared/ui";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "#/shared/ui/Sheet.tsx";
import { CartProduct } from "./CartProduct.tsx";
import { useCart } from "./model";

/* ===== Typing props ===== */
interface Props {
  className?: string;
}

/* ===== CartButton component ===== */
export function CartButton({ className }: Props) {
  const {
    isLoading,
    products,
    hasUnavailableProducts,
    totalPrice,
    productsQuantity
  } = useCart();

  return (
    <Sheet>
      <div className="relative">
        <SheetTrigger asChild>
          <Button className={cn("", className)} loading={isLoading}>
            <div className="group grid grid-cols-[repeat(3,auto)] items-start">
              <Price className="font-bold" amount={totalPrice} />
              <span className="h-full w-px bg-white/30 mx-3" />
              <div className="flex items-center gap-1 transition-opacity duration-300 group-hover:opacity-0 col-start-3 row-start-1">
                <ShoppingCartIcon size="16" strokeWidth="2" />
                <b>{productsQuantity}</b>
              </div>
              <ArrowRight
                size={20}
                className="transition duration-300 opacity-0 group-hover:opacity-100 col-start-3 row-start-1 -translate-x-2 group-hover:translate-x-0 justify-self-center"
              />
            </div>
          </Button>
        </SheetTrigger>
        <Toaster
          position="top-right"
          className="data-sonner-toaster:absolute! data-sonner-toaster:top-full! data-sonner-toaster:right-0! data-sonner-toaster:translate-y-2!"
          expand
          visibleToasts={2}
        />
      </div>

      <SheetContent className="bg-gray-100 gap-0">
        {products.length > 0 ? (
          <>
            <SheetHeader>
              <SheetTitle asChild>
                <h1 className="text-lg font-bold">
                  В корзине {productsQuantity} товара на сумму{" "}
                  <Price amount={totalPrice} />
                </h1>
              </SheetTitle>
            </SheetHeader>

            {hasUnavailableProducts && (
              <section
                className="bg-gray-200 p-3 text-sm flex gap-2"
                role="alert"
                aria-live="assertive"
              >
                <InfoIcon aria-hidden />
                <p>
                  Некоторые продукты разобрали или у нас закончились ингредиенты
                </p>
              </section>
            )}

            <ScrollArea className="grow h-0" type="auto">
              <div className="flex flex-col gap-2">
                {products.map((product) => (
                  <CartProduct
                    className="pr-3"
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="bg-white">
              <p className="flex justify-between text-lg font-bold mb-4">
                <span>Сумма заказа</span>
                <Price amount={totalPrice} />
              </p>

              <Button
                className="text-base font-bold rounded-full w-full h-12"
                type="link"
                href="/checkout"
                disabled={hasUnavailableProducts}
              >
                Оформить заказ
              </Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative aspect-video w-[85%]">
              <Image
                draggable="false"
                src="/assets/cart-empty.svg"
                alt="Пустая карзина"
                sizes="112px"
                fill
                aria-hidden
              />
            </div>
            <h2 className="text-xl font-bold my-2">Пока тут пусто</h2>
            <p className="text-center text-neutral-500 mb-5">
              Пицца, пицца и что‑нибудь попить.
            </p>

            <SheetClose>
              <Button className="text-base">
                <ArrowLeft className="w-5 mr-2" />
                Вернуться назад
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
