import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { useCartActions, useCartStore } from "../store/CartStore";
import { useShallow } from "zustand/shallow";

const Navbar = () => {
  // state 가져오기
  const { cartItems, amount } = useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
    }))
  );
  // action 가져오기
  const { calculateTotals } = useCartActions();

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals, cartItems]);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <span
        className="text-2xl font-semibold cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        Minseeeeo
      </span>
      <span className="flex gap-3">
        <ShoppingCart size={23} />
        <span>{amount}</span>
      </span>
    </div>
  );
};

export default Navbar;
