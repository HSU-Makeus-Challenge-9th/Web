import { create } from 'zustand';
import cartItems from '../constants/cattItems';

interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

interface CartState {
  cartItems: CartItem[];
  amount: number;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalAmounts: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: cartItems,
  amount: 0,

  increase: (id: string) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      ),
    })),

  decrease: (id: string) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount >= 1),
    })),

  removeItem: (id: string) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  clearCart: () =>
    set({
      cartItems: [],
      amount: 0,
    }),

  totalAmounts: () =>
    set((state) => {
      let amount = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
      });
      return { amount };
    }),
}));
