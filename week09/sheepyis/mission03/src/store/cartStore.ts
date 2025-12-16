import { create } from "zustand";
import cartItems from "../constants/cartItems";
import type { CartItem, CartStore } from "../types/cart";

const calculate = (items: CartItem[]) =>
  items.reduce(
    (acc, item) => {
      acc.amount += item.amount;
      acc.total += Number(item.price) * item.amount;
      return acc;
    },
    { amount: 0, total: 0 }
  );

export const useCartStore = create<CartStore>((set, get) => {
  const { amount, total } = calculate(cartItems);

  return {
    cartItems,
    amount,
    total,

    increase: (id) => {
      set((state) => {
        const item = state.cartItems.find((item) => item.id === id);
        if (!item) return state;

        item.amount += 1;
        return state;
      });
      get().calculateTotals();
    },

    decrease: (id) => {
      set((state) => {
        const item = state.cartItems.find((item) => item.id === id);
        if (!item) return state;

        item.amount -= 1;
        if (item.amount < 1) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        }
        return state;
      });
      get().calculateTotals();
    },

    removeItem: (id) => {
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== id),
      }));
      get().calculateTotals();
    },

    clearCart: () => {
      set({
        cartItems: [],
        amount: 0,
        total: 0,
      });
    },

    calculateTotals: () => {
      const { amount, total } = calculate(get().cartItems);
      set({ amount, total });
    },
  };
});
