import useCartStore from "../store/useCartStore";
import { CartItemType } from "../store/useCartStore";
import { ChevronUp, ChevronDown } from "../icons";

const CartItem = ({ id, title, singer, price, img, amount }: CartItemType) => {
  const { increase, decrease, removeItem } = useCartStore();

  return (
    <article className="flex justify-between items-center mb-6 border-b pb-6 last:border-b-0">
      <div className="flex gap-6 items-center">
        <img
          src={img}
          alt={title}
          className="w-24 h-24 object-cover rounded-lg shadow-md"
        />
        <div className="flex flex-col justify-center gap-1">
          <h4 className="text-xl font-bold text-gray-800 tracking-tight">
            {title}
          </h4>
          <h4 className="text-md text-gray-500 font-medium">{singer}</h4>
          <h4 className="text-lg font-semibold text-gray-600">
            ₩ {parseInt(price).toLocaleString()}
          </h4>
          <button
            className="text-red-500 text-sm text-left mt-2 hover:text-red-700 transition font-semibold"
            onClick={() => removeItem(id)}
          >
            삭제
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          className="text-indigo-600 hover:text-indigo-800 transition p-1"
          onClick={() => increase(id)}
        >
          <ChevronUp />
        </button>

        <p className="text-xl font-bold text-gray-800 w-8 text-center">
          {amount}
        </p>

        <button
          className="text-indigo-600 hover:text-indigo-800 transition p-1"
          onClick={() => decrease(id)}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
