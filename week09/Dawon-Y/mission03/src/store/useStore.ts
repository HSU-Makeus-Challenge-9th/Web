import { create } from 'zustand';
import cartItems from '../constants/cartItems';

export interface CartItemType {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

interface StoreState {
  // Cart 상태
  cartItems: CartItemType[];
  amount: number;
  total: number;
  
  // Modal 상태
  isModalOpen: boolean;
  
  // Cart 액션
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  
  // Modal 액션
  openModal: () => void;
  closeModal: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // 초기 상태
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isModalOpen: false,
  
  // Cart 액션들
  increase: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      ),
    })),
  
  decrease: (id) =>
    set((state) => {
      const item = state.cartItems.find((item) => item.id === id);
      if (item && item.amount === 1) {
        return {
          cartItems: state.cartItems.filter((item) => item.id !== id),
        };
      }
      return {
        cartItems: state.cartItems.map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        ),
      };
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
    const { cartItems } = get();
    let amount = 0;
    let total = 0;
    
    cartItems.forEach((item) => {
      amount += item.amount;
      total += item.amount * Number(item.price);
    });
    
    set({ amount, total });
  },
  
  // Modal 액션들
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));