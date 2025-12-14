import type { CartItems } from "../types/cart";
import cartItems from "../constants/cartItems";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: { lp: cartItems },
  amount: 0,
  total: 0,
};

// cartSlice 생성 (Redux Toolkit에서 제공)
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<{ id: string }>) => {
      // 1. 아이디 가져오기
      const itemId = action.payload.id;

      // 2. 특정 id값 음반 찾기
      const item = state.cartItems.lp.find(
        (cartItem) => cartItem.id === itemId
      );

      // 3. 있다면 증가
      if (item) {
        item.amount += 1;
      }
    },
    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;

      const item = state.cartItems.lp.find(
        (cartItem) => cartItem.id === itemId
      );

      if (item) {
        item.amount = Math.max(0, item.amount - 1);
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;

      state.cartItems.lp = state.cartItems.lp.filter(
        (cartItem) => cartItem.id !== itemId
      );
    },
    clearCart: (state) => {
      state.cartItems.lp = [];
      state.amount = 0;
      state.total = 0;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.lp.forEach((item) => {
        amount += item.amount;
        total += Number(item.price) * item.amount;
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

// 액션 export
export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

// duck 패턴으로 reducer는 export default로 내보내야 함(?)
const cartReducer = cartSlice.reducer;

export default cartReducer;
