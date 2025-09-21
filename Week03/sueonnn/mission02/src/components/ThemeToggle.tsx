import React from "react";
import { useTheme, THEME } from "../context/ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === THEME.DARK;

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="테마 변경"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
