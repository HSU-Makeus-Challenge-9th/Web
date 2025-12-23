import { create } from "zustand";
import cartItems from "../constants/cartItems";
import type { CartItems } from "../types/cart";

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

// 상태 정의
interface CartState {
  // state
  cartItems: CartItems;
  amount: number;
  total: number;

  // action
  actions: CartActions;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: { lp: cartItems },
  amount: 0,
  total: 0,

  actions: {
    increase: (id: string) =>
      set((state) => ({
        cartItems: {
          lp: state.cartItems.lp.map((item) =>
            item.id === id ? { ...item, amount: item.amount + 1 } : item
          ),
        },
      })),
    decrease: (id: string) =>
      set((state) => ({
        cartItems: {
          lp: state.cartItems.lp.map((item) =>
            item.id === id
              ? { ...item, amount: Math.max(0, item.amount - 1) }
              : item
          ),
        },
      })),
    removeItem: (id: string) =>
      set((state) => ({
        cartItems: {
          lp: state.cartItems.lp.filter((item) => item.id !== id),
        },
      })),
    clearCart: () =>
      set({
        cartItems: { lp: [] },
        amount: 0,
        total: 0,
      }),
    calculateTotals: () =>
      set((state) => {
        let amount = 0;
        let total = 0;

        state.cartItems.lp.forEach((item) => {
          amount += item.amount;
          total += Number(item.price) * item.amount;
        });

        return { amount, total };
      }),
  },
}));

export const useCartActions = (): CartActions =>
  useCartStore((state) => state.actions);
