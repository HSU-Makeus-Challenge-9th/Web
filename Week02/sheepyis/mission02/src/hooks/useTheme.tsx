import { useContext } from "react";
import type { IThemeContext } from "../context/ThemeProvider";
import { ThemeContext } from "../context/ThemeProvider";

export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
