import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { queryClient } from "#/shared/lib/tanstack/query";
import { cartToast } from "../ui/CartToaster.tsx";

export const queries = {
  getCart: <T>() =>
    queryOptions<T>({
      queryKey: ["cart"],
      queryFn: async () => {
        const res = await fetch("/api/cart", {
          credentials: "include"
        });

        return res.json();
      }
    })
};

export const mutations = {
  addToCart: () =>
    mutationOptions({
      mutationFn: async ({
        productVariantId,
        excludedIngredientIds = [],
        selectedToppingIds = []
      }: {
        productVariantId: string;
        excludedIngredientIds?: string[];
        selectedToppingIds?: string[];
      }) => {
        const res = await fetch("/api/cart/items", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productVariantId,
            excludedIngredientIds,
            selectedToppingIds
          })
        });

        return res.json();
      },
      onSuccess: async (newItem) => {
        void queryClient.invalidateQueries({ queryKey: ["cart"] });
        cartToast(newItem);
      }
    }),
  deleteCartItem: () =>
    mutationOptions({
      mutationFn: async (cartItemId: string) => {
        return fetch(`/api/cart/items/${cartItemId}`, {
          method: "DELETE",
          credentials: "include"
        });
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] })
    }),
  updateCartItemQuantity: () =>
    mutationOptions({
      mutationFn: async ({
        cartItemId,
        delta
      }: {
        cartItemId: string;
        delta: number;
      }) => {
        return fetch(`/api/cart/items/${cartItemId}`, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ delta })
        });
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] })
    })
};
