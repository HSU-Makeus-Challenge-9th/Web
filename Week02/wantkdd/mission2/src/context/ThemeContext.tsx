import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type ThemeContextType = {
  isDark: boolean;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggle: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const toggle = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme은 ThemeProvider 안에서만 쓸 수 있음');
  }
  return context;
};
