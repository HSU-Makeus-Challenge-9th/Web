import { useAppDispatch } from "../hooks/useCustomRedux";
import { decrease, increase, removeItem } from "../slices/cartSlice";
import { CartItemType } from "../types/cart";
import { ChevronUp, ChevronDown } from "../icons";

const CartItem = ({ id, title, singer, price, img, amount }: CartItemType) => {
  const dispatch = useAppDispatch();

  return (
    <article className="flex justify-between items-center mb-6">
      <div className="flex gap-4">
        <img
          src={img}
          alt={title}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="flex flex-col justify-center">
          <h4 className="text-lg font-bold text-gray-800">{title}</h4>
          <h4 className="text-sm text-gray-500 mb-1">{singer}</h4>
          <h4 className="text-md font-semibold text-gray-600">
            ₩ {parseInt(price).toLocaleString()}
          </h4>
          <button
            className="text-red-500 text-sm text-left mt-1 hover:text-red-700 transition"
            onClick={() => dispatch(removeItem(id))}
          >
            삭제
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {/* 증가 버튼 */}
        <button
          className="text-indigo-600 hover:text-indigo-800"
          onClick={() => dispatch(increase(id))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>

        <p className="text-lg font-medium mx-2">{amount}</p>

        {/* 감소 버튼 */}
        <button
          className="text-indigo-600 hover:text-indigo-800"
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(decrease(id));
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default CartItem;
