import { useAppSelector, useAppDispatch } from '../hooks/useCustomRedux';
import CartItem from './CartItem';
import { clearCart } from '../features/cart/cartSlice';

const CartList = () => {
  const dispatch = useAppDispatch();
  const { cartItems, total, amount } = useAppSelector((state) => state.cart);

  if (amount < 1) {
    return (
      <section className='cart py-10 text-center'>
        <header>
          <h2 className='text-3xl font-bold mb-4'>YOUR BAG</h2>
          <h4 className='empty-cart text-gray-500 text-lg'>is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className='cart py-10 max-w-4xl mx-auto px-4'>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>
      <footer className='mt-8 pt-4 border-t border-gray-300'>
        <div className='cart-total flex justify-between items-center mb-6'>
          <h4 className='text-lg font-bold capitalize'>total</h4>
          <span className='total-price text-xl font-bold'>${total.toFixed(2)}</span>
        </div>
        <div className='text-center'>
          <button
            className='btn clear-btn bg-red-200 text-red-700 px-6 py-2 rounded font-bold uppercase tracking-widest hover:bg-red-300 transition'
            onClick={() => dispatch(clearCart())}
          >
            clear cart
          </button>
        </div>
      </footer>
    </section>
  );
};

export default CartList;