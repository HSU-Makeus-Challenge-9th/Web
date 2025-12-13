import { useCartStore } from "../../store";
import type { CartItem } from "../../types/cart";

interface ItemProps {
  item: CartItem;
}

const ItemCart = ({ item }: ItemProps) => {
  const { increase, decrease } = useCartStore();

  return (
    <div className="w-full flex justify-between items-center py-4.5 border-b border-gray-300">
      <div className="flex gap-2 items-center">
        <img className="w-18 h-18 rounded-md" src={item.img} alt={item.title} />

        <div className="flex flex-col gap-0.9 max-w-[80%]">
          <p className="font-bold truncate">{item.title}</p>
          <p className="text-xs text-gray-500 font-semibold">{item.singer}</p>
          <p className="font-bold text-sm">
            ${Number(item.price).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center font-semibold">
        <button
          className="px-3 py-1 bg-gray-300 rounded-l-md cursor-pointer"
          onClick={() => decrease(item.id)}
        >
          -
        </button>
        <p className="px-3.5 py-1 border border-gray-300">{item.amount}</p>
        <button
          className="px-3 py-1 bg-gray-300 rounded-r-md cursor-pointer"
          onClick={() => increase(item.id)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ItemCart;
