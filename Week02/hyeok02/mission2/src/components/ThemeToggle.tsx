import { useTheme } from "../context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex h-[40px] w-[140px] items-center justify-center gap-2 rounded-xl text-sm font-bold transition-colors
        ${
          isDark
            ? "bg-neutral-900 text-neutral-50"
            : "bg-neutral-100 text-neutral-900"
        }`}
      aria-label={isDark ? "라이트 모드" : "다크 모드"}
    >
      <span>{isDark ? "🌞" : "🌙"}</span>
      <span>{isDark ? "라이트 모드" : "다크 모드"}</span>
    </button>
  );
};
