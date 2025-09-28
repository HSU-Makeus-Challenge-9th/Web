import clsx from 'clsx';
import useTheme from '../contexts/useTheme';

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={clsx(
        'w-full flex justify-end p-4 transition-colors duration-500',
        theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'
      )}
    >
      <button
        onClick={toggleTheme}
        className={clsx(
          'w-32 px-4 py-2 rounded-md transition-colors duration-500 border border-gray-400',
          theme === 'light'
            ? '!bg-white !text-black hover:!bg-gray-200'
            : '!bg-gray-700 !text-white hover:!bg-gray-600'
        )}
      >
        {theme === 'light' ? '다크 모드' : '라이트 모드'}
      </button>
    </div>
  );
}

export default Navbar;