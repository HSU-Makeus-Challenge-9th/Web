import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux";
import CartItem from "./CartItem";
import { calculateTotals } from "../slices/cartSlice";
import { openModal } from "../slices/modalSlice";

const CartList = () => {
  const dispatch = useAppDispatch();
  const { cartItems, total, amount } = useAppSelector((store) => store.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  if (amount < 1) {
    return (
      <section className="mt-10 text-center">
        <header>
          <h2 className="text-3xl font-bold text-gray-700 mb-4">
            당신의 장바구니
          </h2>
          <h4 className="text-xl text-gray-500">현재 비어있습니다.</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto p-4 mt-10 mb-20">
      <header>
        <h2 className="text-3xl font-bold text-gray-700 mb-8 uppercase text-center">
          당신의 장바구니
        </h2>
      </header>

      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      <footer className="mt-8 border-t border-gray-300 pt-6">
        <div className="flex justify-between text-xl font-bold text-gray-700 mb-6">
          <h4>총 가격</h4>
          <span>₩ {total.toLocaleString()}원</span>
        </div>
        <div className="text-center">
          <button
            className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-500 hover:text-white transition uppercase tracking-widest font-bold"
            onClick={() => {
              dispatch(openModal());
            }}
          >
            장바구니 비우기
          </button>
        </div>
      </footer>
    </section>
  );
};

export default CartList;
