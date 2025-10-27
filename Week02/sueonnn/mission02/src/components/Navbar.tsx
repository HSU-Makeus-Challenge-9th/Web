import { useTheme } from "../contexts/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <nav
      className={
        "flex w-full justify-end p-4 transition-colors duration-500 " +
        (isLight ? "bg-white text-black" : "bg-gray-800 text-white")
      }
    >
      <button
        type="button"
        onClick={toggleTheme}
        className={
          "px-4 py-2 w-32 rounded-md border transition-colors duration-500 " +
          (isLight
            ? "border-gray-400 bg-white text-black hover:bg-gray-200"
            : "border-gray-500 bg-gray-700 text-white hover:bg-gray-600")
        }
      >
        {isLight ? "다크 모드" : "라이트 모드"}
      </button>
    </nav>
  );
}

export default Navbar;
