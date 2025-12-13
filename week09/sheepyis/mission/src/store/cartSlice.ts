import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartState, CartItem } from "../types/cart";

const calculate = (items: CartItem[]) => {
  return items.reduce(
    (acc, item) => {
      acc.amount += item.amount;
      acc.total += Number(item.price) * item.amount;
      return acc;
    },
    { amount: 0, total: 0 }
  );
};

const { amount, total } = calculate(cartItems);

const initialState: CartState = {
  cartItems,
  amount,
  total,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (!item) return;

      item.amount += 1;

      cartSlice.caseReducers.calculateTotals(state);
    },

    decrease: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (!item) return;

      item.amount -= 1;

      if (item.amount < 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }

      cartSlice.caseReducers.calculateTotals(state);
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      cartSlice.caseReducers.calculateTotals(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },

    calculateTotals: (state) => {
      const { amount, total } = calculate(state.cartItems);
      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
