import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
type ThemeValue = {
  theme: Theme;
  toggle: () => void;
  set: (t: Theme) => void;
};

const THEME_STORAGE_KEY = "theme";
const Ctx = createContext<ThemeValue | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || null;
    if (saved === "light" || saved === "dark") return saved;

    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches;

    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo<ThemeValue>(
    () => ({
      theme,
      toggle: () => setTheme((p) => (p === "light" ? "dark" : "light")),
      set: setTheme,
    }),
    [theme]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
