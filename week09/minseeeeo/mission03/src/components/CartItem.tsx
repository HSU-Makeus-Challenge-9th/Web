import { useCartActions } from "../store/CartStore";
import type { LP } from "../types/cart";

interface CartItemProps {
  lp: LP;
}

const CartItem = ({ lp }: CartItemProps) => {
  // action 가져오기
  const { increase, decrease, removeItem } = useCartActions();

  const handleIncreaseCount = () => {
    increase(lp.id);
  };
  const handleDecreaseCount = () => {
    if (lp.amount === 1) {
      removeItem(lp.id);
    }
    decrease(lp.id);
  };

  return (
    <div className="flex items-center py-5 border-b border-gray-300 mx-5">
      <img
        src={lp.img}
        className="w-20 h-20 object-cover rounded-lg mr-5"
      ></img>

      <div className="flex-1">
        <div className="text-lg font-semibold">{lp.title}</div>
        <div className="text-sm text-gray-500">{lp.singer}</div>
        <div className="text-sm font-semibold">$ {lp.price}</div>
      </div>

      <div className="flex items-center">
        <button
          className="bg-gray-200 px-2.5 py-0.75 rounded-lg hover:bg-gray-400 cursor-pointer duration-300 ease-in-out"
          onClick={handleDecreaseCount}
        >
          -
        </button>
        <span className="px-3 py-0.5 border-y border-gray-200">
          {lp.amount}
        </span>
        <button
          className="bg-gray-200 px-2.5 py-0.75 rounded-lg hover:bg-gray-400 cursor-pointer duration-300 ease-in-out"
          onClick={handleIncreaseCount}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
