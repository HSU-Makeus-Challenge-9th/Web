import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartslice";
import modalReducer from "./modalslice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
