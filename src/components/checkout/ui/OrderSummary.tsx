"use client";

import type { ComponentProps } from "react";
import { cn } from "#/shared/lib/tailwind";
import { Price, ScrollArea } from "#/shared/ui";
import { useCart } from "../model";

/* ===== Typing props ===== */
interface Props extends ComponentProps<"article"> {
  className?: string;
}

/* ===== OrderSummary component ===== */
export function OrderSummary({ className }: Props) {
  const { products, totalPrice } = useCart();

  const promoDiscount = Math.floor((totalPrice * 15) / 100);
  const deliveryPrice = 25000;
  const finalPrice = totalPrice - promoDiscount + deliveryPrice;

  return (
    <article
      className={cn(
        "flex flex-col p-8 bg-white shadow-2xl rounded-3xl",
        className
      )}
    >
      <h3 className="text-lg font-bold mb-8">Состав заказа</h3>
      <ScrollArea className="grow min-h-0 -mr-7" type="auto">
        <ul className="flex flex-col gap-5 pr-7">
          {products.map((product) => (
            <li key={product.id} className="flex justify-between gap-2">
              <div>
                <h4 className="text-base font-bold leading-4 mb-1">
                  {product.name}
                </h4>
                <p className="text-sm font-semibold text-gray-500 lowercase first-letter:uppercase">
                  {product.summary}
                </p>
                {product.excludedIngredients.length > 0 && (
                  <p className="text-sm font-semibold text-red-700 lowercase first-letter:uppercase">
                    Убрано: {product.excludedIngredients.join(", ")}
                  </p>
                )}
                {product.selectedToppings.length > 0 && (
                  <p className="text-sm font-semibold text-green-700 lowercase first-letter:uppercase">
                    Добавлено:{" "}
                    {product.selectedToppings
                      .map(({ name }) => name)
                      .join(", ")}
                  </p>
                )}
              </div>
              {product.inStock ? (
                <p className="flex flex-col leading-4 text-end">
                  {product.quantity > 1 && <span>{product.quantity} × </span>}
                  <Price amount={product.price} />
                </p>
              ) : (
                <p className="leading-none whitespace-nowrap">Нет в наличии</p>
              )}
            </li>
          ))}
        </ul>
      </ScrollArea>
      <footer className="mt-4 pt-4 border-t-2 border-t-gray-200">
        <dl>
          <p className="flex justify-between">
            <dt>Сумма корзины</dt>
            <dd>
              <Price amount={totalPrice} />
            </dd>
          </p>
          <p className="flex justify-between text-primary">
            <dt>Скидка по акции (-15%)</dt>
            <dd>
              <Price amount={-promoDiscount} />
            </dd>
          </p>
          <p className="flex justify-between">
            <dt>Доставка</dt>
            <dd>
              <Price amount={deliveryPrice} />
            </dd>
          </p>
          <p className="flex justify-between mt-4 pt-4 border-t-2 border-t-gray-200">
            <dt className="text-lg font-bold">Итого</dt>
            <dd>
              <Price amount={finalPrice} />
            </dd>
          </p>
        </dl>
      </footer>
    </article>
  );
}
