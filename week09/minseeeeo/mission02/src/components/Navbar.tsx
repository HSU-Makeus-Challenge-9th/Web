import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { useEffect } from "react";
import { calculateTotals } from "../slices/cartSlice";

const Navbar = () => {
  const { amount, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems]);

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
