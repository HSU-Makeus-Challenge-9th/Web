import { useStore } from '../store/useStore';
import type { CartItemType } from '../store/useStore';

interface Props {
  item: CartItemType;
}

const CartItem = ({ item }: Props) => {
  const increase = useStore((state) => state.increase);
  const decrease = useStore((state) => state.decrease);
  
  const { id, title, singer, price, img, amount } = item;

  return (
    <article className='flex items-center gap-6 py-6 border-b border-gray-200'>
      {/* 이미지 */}
      <img src={img} alt={title} className='w-[90px] h-[90px] object-cover rounded' />
      
      {/* 정보 영역 */}
      <div className='flex-1'>
        <h4 className='text-xl font-bold mb-1'>{title}</h4>
        <p className='text-gray-600 text-sm mb-2'>{singer}</p>
        <p className='text-lg font-semibold'>${Number(price).toLocaleString()}</p>
      </div>

      {/* 버튼 영역 */}
      <div className='flex items-center'>
        <button
          className='w-9 h-9 flex justify-center items-center bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-lg font-bold border border-gray-300'
          onClick={() => decrease(id)}
        >
          -
        </button>
        <div className='w-12 h-9 flex justify-center items-center bg-white text-gray-700 text-base font-semibold border-t border-b border-gray-300'>
          {amount}
        </div>
        <button
          className='w-9 h-9 flex justify-center items-center bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-lg font-bold border border-gray-300'
          onClick={() => increase(id)}
        >
          +
        </button>
      </div>
    </article>
  );
};

export default CartItem;