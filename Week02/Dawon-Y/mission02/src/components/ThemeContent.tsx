import clsx from 'clsx';
import useTheme from '../contexts/useTheme.ts';

function ThemeContent() {
  const { theme } = useTheme();

  // 현재 테마가 라이트 모드인지 확인
  const isLightMode = theme === 'light';

  return (
    <div
      className={clsx(
        'p-4 h-full w-full flex flex-col items-center justify-center'
      )}
    >
      <h1 className="text-2xl font-bold mb-4">Theme Content</h1>
      <p className="text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
}

export default ThemeContent;