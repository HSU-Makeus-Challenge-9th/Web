import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cartItems, { CartItemType } from "../constants/cartItems";
import { CartState } from "../types/cart";

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 1. 수량 증가
    increase: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (item) {
        item.amount += 1;
      }
    },
    // 2. 수량 감소 (1보다 작아지면 제거)
    decrease: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);

      if (item) {
        item.amount -= 1;
        // 감소 후 1보다 작으면 리스트에서 제거
        if (item.amount < 1) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== itemId
          );
        }
      }
    },
    // 3. 아이템 제거
    removeItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    // 4. 전체 삭제
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    // 5. 전체 합계 계산
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        // 가격이 문자열이므로 숫자로 변환
        total += item.amount * parseInt(item.price);
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
