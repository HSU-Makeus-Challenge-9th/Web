import React, { useEffect } from "react";
import CartItem from "./cartitem";
import ConfirmationModal from "./modal";
import { useStore } from "../store/store";

const Cart: React.FC = () => {
  const { cartItems, amount, total, calculateTotals, openModal } = useStore();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <div className="p-5">
      <h1 className="text-2xl">장바구니</h1>

      <div className="my-5">
        {cartItems.length > 0 ? (
          cartItems.map((item) => <CartItem key={item.id} {...item} />)
        ) : (
          <p className="text-gray-500">장바구니가 비어 있습니다.</p>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="flex justify-between items-center">
          <div>
            <p>총 수량: {amount}</p>
            <p>총 금액: ₩{total}</p>
          </div>
          <button
            onClick={openModal}
            className="bg-red-500 text-white px-5 py-2 rounded"
          >
            전체 삭제
          </button>
        </div>
      )}

      <ConfirmationModal />
    </div>
  );
};

export default Cart;
