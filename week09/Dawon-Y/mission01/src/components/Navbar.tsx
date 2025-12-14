import { useAppSelector } from '../hooks/useCustomRedux';

const Navbar = () => {
  const { amount } = useAppSelector((state) => state.cart);

  return (
    <nav className='bg-[#2c3e50] text-white py-5'>
      <div className='max-w-5xl mx-auto px-8 flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Dawon-Y</h1>
        <div className='flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-7 w-7'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
            />
          </svg>
          <span className='text-xl font-semibold'>{amount}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;