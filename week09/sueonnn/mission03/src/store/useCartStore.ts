import { create } from "zustand";
import cartItems from "../constants/cartItems";

export interface CartItemType {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

interface CartState {
  cartItems: CartItemType[];
  amount: number;
  total: number;
  isOpen: boolean;
}

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  openModal: () => void;
  closeModal: () => void;
}

// Zustand 스토어 생성
const useCartStore = create<CartState & CartActions>((set) => ({
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isOpen: false,

  // 수량 증가
  increase: (id) =>
    set((state) => {
      const newCartItems = state.cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return { cartItems: newCartItems };
    }),

  // 수량 감소 (1 미만 시 삭제)
  decrease: (id) =>
    set((state) => {
      const itemToCheck = state.cartItems.find((item) => item.id === id);
      // 아이템이 있고 수량이 1이면 삭제
      if (itemToCheck?.amount === 1) {
        return {
          cartItems: state.cartItems.filter((item) => item.id !== id),
        };
      }
      // 그 외엔 감소
      const newCartItems = state.cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      });
      return { cartItems: newCartItems };
    }),

  // 아이템 개별 삭제
  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  // 전체 삭제
  clearCart: () =>
    set(() => ({
      cartItems: [],
      amount: 0,
      total: 0,
    })),

  // 총액 및 수량 계산
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

  // 모달 열기
  openModal: () => set({ isOpen: true }),

  // 모달 닫기
  closeModal: () => set({ isOpen: false }),
}));

export default useCartStore;
