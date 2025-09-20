import clsx from 'clsx';
import useTheme from './useTheme';

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        'px-4 py-2 rounded-md transition-colors duration-500',
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