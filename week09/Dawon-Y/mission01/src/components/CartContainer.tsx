import { useEffect } from 'react';
import CartItem from './CartItem';
import Modal from './Modal';
import { calculateTotals } from '../features/cart/cartSlice';
import { openModal } from '../features/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useCustomRedux';

const CartContainer = () => {
  const dispatch = useAppDispatch();
  const { cartItems, amount, total } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  if (amount < 1) {
    return (
      <section className='max-w-5xl mx-auto px-8 py-12'>
        <header className='mb-12'>
          <h2 className='text-4xl font-bold text-center'>YOUR BAG</h2>
        </header>
        <h4 className='text-center text-gray-500 text-xl'>is currently empty</h4>
      </section>
    );
  }

  return (
    <>
      <section className='max-w-5xl mx-auto px-8 py-12'>
        <div className='bg-white'>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <footer className='mt-12'>
          <div className='border-t-2 border-gray-800 pt-8 pb-6'>
            <div className='flex justify-between items-center mb-8'>
              <button
                className='px-6 py-2 border-2 border-black text-black rounded hover:bg-gray-50 transition font-semibold'
                onClick={() => dispatch(openModal())}
              >
                전체 삭제
              </button>
              <div className='text-right'>
                <h4 className='text-2xl font-bold'>
                  총액 <span className='ml-2'>${total.toLocaleString()}</span>
                </h4>
              </div>
            </div>
          </div>
        </footer>
      </section>
      
      <Modal />
    </>
  );
};

export default CartContainer;