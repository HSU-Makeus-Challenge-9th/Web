import { create } from "zustand";
import cartItemsData, { CartItemType } from "../constant/cartitems";

interface StoreState {
  // cart
  cartItems: CartItemType[];
  amount: number;
  total: number;

  // modal
  isModalOpen: boolean;

  // cart actions
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;

  // modal actions
  openModal: () => void;
  closeModal: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // ✅ Redux 초기 상태 그대로 이관
  cartItems: cartItemsData,
  amount: cartItemsData.reduce((sum, item) => sum + item.amount, 0),
  total: cartItemsData.reduce((sum, item) => sum + item.price * item.amount, 0),

  // modal
  isModalOpen: false,

  // ✅ Redux reducer → Zustand action 변환
  increase: (id) =>
    set((state) => {
      const items = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      return { cartItems: items };
    }),

  decrease: (id) =>
    set((state) => {
      const items = state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0);
      return { cartItems: items };
    }),

  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  clearCart: () =>
    set({
      cartItems: [],
      amount: 0,
      total: 0,
    }),

  calculateTotals: () => {
    const items = get().cartItems;
    set({
      amount: items.reduce((sum, item) => sum + item.amount, 0),
      total: items.reduce((sum, item) => sum + item.price * item.amount, 0),
    });
  },

  // modal actions
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
