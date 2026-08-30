import { create } from 'zustand';
import cartItems from '../constants/cartItems';
import type { Lp } from '../types/cart';

interface CartState {
  // 상태
  cartItems: Lp[];
  amount: number;
  total: number;
  isModalOpen: boolean;
  
  // 액션
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  // 초기 상태
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isModalOpen: false,

  // 액션들
  increase: (id: string) =>
    set((state) => {
      const updatedItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      return { cartItems: updatedItems };
    }),

  decrease: (id: string) =>
    set((state) => {
      const updatedItems = state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0);
      return { cartItems: updatedItems };
    }),

  removeItem: (id: string) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  clearCart: () =>
    set(() => ({
      cartItems: [],
      amount: 0,
      total: 0,
    })),

  calculateTotals: () =>
    set((state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * parseInt(item.price);
      });
      return { amount, total };
    }),

  openModal: () => set(() => ({ isModalOpen: true })),
  
  closeModal: () => set(() => ({ isModalOpen: false })),
}));