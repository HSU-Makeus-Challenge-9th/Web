import { useEffect } from "react";
import useCartStore from "../store/useCartStore";
import CartItem from "./CartItem";

const CartList = () => {
  // Zustand에서 상태와 액션 추출
  const { cartItems, total, amount, calculateTotals, openModal } =
    useCartStore();

  // 장바구니 아이템이 변경될 때마다 총액 재계산
  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  if (amount < 1) {
    return (
      <section className="mt-20 text-center px-4">
        <header>
          <h2 className="text-4xl font-bold text-gray-700 mb-6">
            당신의 장바구니
          </h2>
          <h4 className="text-xl text-gray-400">현재 비어있습니다.</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="max-w-7xl w-full mx-auto px-8 py-12 mb-20">
      <header>
        <h2 className="text-4xl font-bold text-gray-700 mb-12 uppercase text-center tracking-wide">
          당신의 장바구니
        </h2>
      </header>

      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      <footer className="mt-12 border-t border-gray-300 pt-8">
        <div className="flex justify-between items-center mb-8 px-4">
          <h4 className="text-2xl font-bold text-gray-700">총 가격</h4>
          <span className="text-2xl font-bold text-indigo-600">
            ₩ {total.toLocaleString()}
          </span>
        </div>
        <div className="text-center">
          <button
            className="border border-red-500 text-red-500 px-8 py-3 rounded-lg hover:bg-red-500 hover:text-white transition uppercase tracking-widest font-bold text-lg shadow-sm"
            onClick={openModal}
          >
            장바구니 비우기
          </button>
        </div>
      </footer>
    </section>
  );
};

export default CartList;
