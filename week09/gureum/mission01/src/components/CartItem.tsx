import type { JSX } from 'react';
import type { Lp } from '../types/cart';
import { useDispatch } from 'react-redux';
import { increase, decrease } from '../features/cart/cartSlice';

interface CartItemProps {
    lp: Lp;
}

const CartItem = ({ lp }: CartItemProps): JSX.Element => {
    const dispatch = useDispatch();

    return (
        <div className='flex items-center p-4 border-b border-gray-200'>
            <img 
                src={lp.img} 
                alt={`${lp.title}의 이미지`} 
                className='w-30 h-20 object-cover mr-4 rounded' 
            />
            <div className='flex-1'>
                <h3 className='text-xl font-semibold'>{lp.title}</h3>
                <p className='text-sm text-gray-600'>{lp.singer}</p>
                <p className='text-sm font-bold text-gray-600'>{parseInt(lp.price).toLocaleString()} 원</p>
            </div>
            <div className='flex items-center'>
                <button 
                    onClick={() => dispatch(decrease(lp.id))}
                    className='px-3 py-1 bg-gray-300 text-gray-800 rounded-l hover:bg-gray-400 cursor-pointer'
                >
                    -
                </button>
                <span className='px-4 py-[3px] border-y border-gray-300'>{lp.amount}</span>
                <button 
                    onClick={() => dispatch(increase(lp.id))}
                    className='px-3 py-1 bg-gray-300 text-gray-800 rounded-r hover:bg-gray-400 cursor-pointer'
                >
                    +
                </button>
            </div>
        </div>
    );
}
export default CartItem;