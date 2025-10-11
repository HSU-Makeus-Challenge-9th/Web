import useTheme from "./useTheme";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      className={
        "px-4 py-2 rounded-md transition-colors duration-500 " +
        (isLight
          ? "bg-gray-200 hover:bg-gray-300 text-black"
          : "bg-gray-700 hover:bg-gray-600 text-pink")
      }
    >
      {isLight ? "다크 모드" : "라이트 모드"}
    </button>
  );
}

export default ThemeToggleButton;
