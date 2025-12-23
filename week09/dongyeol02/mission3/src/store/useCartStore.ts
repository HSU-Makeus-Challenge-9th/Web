// src/stores/useCartStore.ts

import { create } from "zustand";
import cartItems from "../constants/cartItems";

export type CartItem = (typeof cartItems)[number];

type CartState = {
  cartItems: CartItem[];
  amount: number;
  total: number;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const calcTotals = (items: CartItem[]) => {
  let amount = 0;
  let total = 0;

  items.forEach((item) => {
    amount += item.amount;
    total += Number(item.price) * item.amount;
  });

  return { amount, total };
};

const initialTotals = calcTotals(cartItems);

export const useCartStore = create<CartState>((set) => ({
  cartItems,
  amount: initialTotals.amount,
  total: initialTotals.total,

  increase: (id) => {
    set((state) => {
      const cartItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      const { amount, total } = calcTotals(cartItems);
      return { cartItems, amount, total };
    });
  },

  decrease: (id) => {
    set((state) => {
      const cartItems = state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0);

      const { amount, total } = calcTotals(cartItems);
      return { cartItems, amount, total };
    });
  },

  removeItem: (id) => {
    set((state) => {
      const cartItems = state.cartItems.filter((item) => item.id !== id);
      const { amount, total } = calcTotals(cartItems);
      return { cartItems, amount, total };
    });
  },

  clearCart: () => {
    set({ cartItems: [], amount: 0, total: 0 });
  },
}));
