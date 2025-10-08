import clsx from 'clsx';
import useTheme from './useTheme';

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        'px-4 py-2 rounded-md transition-colors duration-500', // padding-left, padding-right: 1rem (16px), padding-top, padding-bottom: 0.5rem (8px), border-radius: 0.375rem (6px)
        theme === 'light'
          ? 'bg-gray-200 hover:bg-gray-300'
          : 'bg-gray-700 hover:bg-gray-600'
      )}
    >
      {theme === 'light' ? '다크 모드' : '라이트 모드'}
    </button>
  );
}

export default ThemeToggleButton;