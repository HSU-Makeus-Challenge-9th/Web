import type { JSX } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCartStore } from '../store/useCartStore';

const Navbar = (): JSX.Element => {
    const { amount } = useCartStore();

    return (
        <div className='flex justify-between items-center p-4 bg-gray-800 text-white'>
            <h1 className='text-2xl font-semibold'>Ohthani Ahn</h1>
            <div className='flex items-center space-x-2'>
                <FaShoppingCart className='text-2xl' />
                <span className='text-xl font-medium'>{amount}</span>
            </div>
        </div>
    );
}
export default Navbar;