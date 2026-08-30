import type { JSX } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const Navbar = (): JSX.Element => {
    const { amount } = useSelector((state: RootState) => state.cart);

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