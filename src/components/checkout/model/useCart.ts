"use client";

import { useQuery } from "@tanstack/react-query";
import { queries } from "../api";

interface CartItem {
  id: string;
  name: string;
  summary: string;
  inStock: boolean;
  imageUrl: string;
  price: number;
  quantity: number;
  excludedIngredients: string[];
  selectedToppings: { name: string; price: number }[];
}

export function useCart() {
  const { data, isLoading } = useQuery(queries.getCart<CartItem[]>());

  const products = data ?? [];

  const hasUnavailableProducts = products.some(({ inStock }) => !inStock);
  const availableProducts = products.filter(({ inStock }) => inStock);

  const getProductPrice = (product: CartItem) => {
    const toppingsTotal = (product.selectedToppings ?? []).reduce(
      (total, topping) => total + topping.price,
      0
    );

    const pizzaUnitPrice = product.price + toppingsTotal;
    return pizzaUnitPrice * product.quantity;
  };

  const totalPrice = availableProducts.reduce(
    (total, product) => total + getProductPrice(product),
    0
  );

  const productsQuantity = products.reduce(
    (total, { quantity }) => total + quantity,
    0
  );

  return {
    isLoading,
    products,
    hasUnavailableProducts,
    availableProducts,
    totalPrice,
    productsQuantity,
    getProductPrice
  } as const;
}
