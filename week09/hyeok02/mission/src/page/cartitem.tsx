import React from 'react';
import { useDispatch } from 'react-redux';
import { increase, decrease } from '../redux/cartslice';
import { ChevronUp, ChevronDown } from '../constant/icons';
import type { CartItemType } from '../constant/cartitems';
import type { AppDispatch } from '../redux/store';

const CartItem: React.FC<CartItemType> = ({ id, title, singer, price, img, amount }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-300">
      <img src={img} alt={title} className="w-[50px] h-[50px] object-cover rounded" />
      <div className="flex-1 ml-4">
        <h4 className="m-0 text-base text-gray-800">{title}</h4>
        <p className="my-1 text-sm text-gray-500">{singer}</p>
        <p className="m-0 text-sm font-bold">₩{price}</p>
      </div>
      <div className="flex flex-col items-center">
        <button onClick={() => dispatch(increase(id))} className="bg-none border-none cursor-pointer text-2xl hover:text-black">
          <ChevronUp />
        </button>
        <span className="my-1 text-base font-bold">{amount}</span>
        <button onClick={() => dispatch(decrease(id))} className="bg-none border-none cursor-pointer text-2xl hover:text-black">
          <ChevronDown />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
