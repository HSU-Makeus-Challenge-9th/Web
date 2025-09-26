import { createContext, useState } from "react";
import type { PropsWithChildren } from "react";

export const THEME = {
  LIGHT: "LIGHT",
  DARK: "DARK",
} as const;

export type TTheme = (typeof THEME)[keyof typeof THEME];

export interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);
  const toggleTheme = (): void => {
    setTheme((prev) => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
