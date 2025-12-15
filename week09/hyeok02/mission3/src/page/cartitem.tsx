import React from "react";
import { ChevronUp, ChevronDown } from "../constant/icons";
import { CartItemType } from "../constant/cartitems";
import { useStore } from "../store/store";

const CartItem: React.FC<CartItemType> = ({
  id,
  title,
  singer,
  price,
  img,
  amount,
}) => {
  const { increase, decrease } = useStore();

  return (
    <div className="flex items-center justify-between py-2 border-b">
      <img src={img} className="w-12 h-12 rounded object-cover" />
      <div className="flex-1 ml-4">
        <h4>{title}</h4>
        <p className="text-sm text-gray-500">{singer}</p>
        <p className="font-bold">₩{price}</p>
      </div>
      <div className="flex flex-col items-center">
        <button onClick={() => increase(id)}>
          <ChevronUp />
        </button>
        <span>{amount}</span>
        <button onClick={() => decrease(id)}>
          <ChevronDown />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
