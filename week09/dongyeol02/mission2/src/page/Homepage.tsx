// Homepage.tsx
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../component/Navbar";
import CartList from "../component/CartList";
import CartSummary from "../component/CartSummary";
import type { RootState } from "../store/store";
import { increase, decrease } from "../features/cart/cartSlice";
import { openModal } from "../features/modal/modalSlice";
import ClearCartModal from "../component/ClearCartModal";

const Homepage = () => {
  const dispatch = useDispatch();

  const {
    cartItems,
    amount: totalAmount,
    total: totalPrice,
  } = useSelector((state: RootState) => state.cart);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar totalAmount={totalAmount} />

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <CartList
          items={cartItems}
          onIncrease={(id) => dispatch(increase(id))}
          onDecrease={(id) => dispatch(decrease(id))}
        />
        <CartSummary
          totalAmount={totalAmount}
          totalPrice={totalPrice}
          onClear={() => dispatch(openModal())}
        />
      </main>
      <ClearCartModal />
    </div>
  );
};

export default Homepage;
