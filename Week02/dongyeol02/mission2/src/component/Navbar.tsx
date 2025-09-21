import { useTheme } from "../hook/useTheme";

const Navbar = () => {
  const { toggleDarkMode, isDarkMode } = useTheme();

  return (
    <nav
      className={`h-20 flex justify-end items-center transition-colors duration-300 ${
        isDarkMode ? "bg-slate-800" : "bg-sky-300"
      }`}
    >
      <button
        className={`p-6 px-8 h-12 w-[10.25rem] rounded-[1.25rem] flex justify-center items-center mr-6 transition-colors duration-300 font-medium ${
          isDarkMode
            ? "bg-white text-black hover:bg-gray-100"
            : "bg-slate-800 text-white hover:bg-slate-700"
        }`}
        onClick={() => toggleDarkMode()}
      >
        {isDarkMode ? "라이트모드 ☀️" : "다크모드 🌙"}
      </button>
    </nav>
  );
};

export default Navbar;
