// CartItem.tsx
import type { CartItem as CartItemType } from "../type/cart";

type CartItemProps = {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
};

function CartItem({ item, onIncrease, onDecrease }: CartItemProps) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4 min-w-0">
        <img
          src={item.img}
          alt={item.title}
          className="w-16 h-16 rounded-md object-cover flex-shrink-0"
        />
        <div className="min-w-0">
          <h2 className="text-sm font-semibold truncate">{item.title}</h2>
          <p className="text-xs text-gray-500 truncate">{item.singer}</p>
          <p className="mt-1 text-sm font-semibold text-gray-800">
            ₩{Number(item.price).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
          onClick={onDecrease}
        >
          -
        </button>
        <span className="flex h-8 min-w-[2.5rem] items-center justify-center rounded-md border border-gray-200 bg-white text-sm">
          {item.amount}
        </span>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
          onClick={onIncrease}
        >
          +
        </button>
      </div>
    </li>
  );
}

export default CartItem;
