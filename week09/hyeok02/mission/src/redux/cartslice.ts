import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cartItems, { CartItemType } from "../constant/cartitems";

interface CartState {
  cartItems: CartItemType[];
  amount: number; // 전체 수량
  total: number; // 전체 금액
}

const initialState: CartState = {
  cartItems,
  amount: cartItems.reduce((sum, item) => sum + item.amount, 0),
  total: cartItems.reduce((sum, item) => sum + item.price * item.amount, 0),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.amount += 1;
      }
    },

    decrease: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.amount -= 1;
        if (item.amount < 1) {
          state.cartItems = state.cartItems.filter(
            (i) => i.id !== action.payload
          );
        }
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },

    calculateTotals: (state) => {
      state.amount = state.cartItems.reduce(
        (sum, item) => sum + item.amount,
        0
      );
      state.total = state.cartItems.reduce(
        (sum, item) => sum + item.price * item.amount,
        0
      );
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
