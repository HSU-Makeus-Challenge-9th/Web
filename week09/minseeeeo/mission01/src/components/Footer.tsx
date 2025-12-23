import { useEffect } from "react";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { calculateTotals, clearCart } from "../slices/cartSlice";

const Footer = () => {
  const { total, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems]);

  const handleClickAllDelete = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="border px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white cursor-pointer duration-300 ease-in-out"
        onClick={handleClickAllDelete}
      >
        전체 삭제
      </button>
      <div className="text-lg p-10 text-end">전체 총 금액: {total}</div>
    </div>
  );
};

export default Footer;
