import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../../constants/cartItems";

export type CartItem = (typeof cartItems)[number];

type CartState = {
  cartItems: CartItem[];
  amount: number; // 전체 수량
  total: number; // 전체 금액
};

const calcTotals = (items: CartItem[]) => {
  let amount = 0;
  let total = 0;

  items.forEach((item) => {
    amount += item.amount;
    total += Number(item.price) * item.amount;
  });

  return { amount, total };
};

const initialTotals = calcTotals(cartItems);

const initialState: CartState = {
  cartItems,
  amount: initialTotals.amount,
  total: initialTotals.total,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 수량 증가
    increase: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (!item) return;
      item.amount += 1;

      const { amount, total } = calcTotals(state.cartItems);
      state.amount = amount;
      state.total = total;
    },

    // 수량 감소 (1보다 작아지면 제거)
    decrease: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (!item) return;

      if (item.amount <= 1) {
        state.cartItems = state.cartItems.filter(
          (i) => i.id !== action.payload
        );
      } else {
        item.amount -= 1;
      }

      const { amount, total } = calcTotals(state.cartItems);
      state.amount = amount;
      state.total = total;
    },

    // 아이템 제거
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      const { amount, total } = calcTotals(state.cartItems);
      state.amount = amount;
      state.total = total;
    },

    // 전체 삭제
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },

    // 전체 합계 계산 (필요 시 외부에서 호출 가능)
    calculateTotals: (state) => {
      const { amount, total } = calcTotals(state.cartItems);
      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
