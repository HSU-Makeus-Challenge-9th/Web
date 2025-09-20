import { createContext } from 'react';
import type { Theme } from './ThemeContext';

export interface ThemeContextInterface {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextInterface | undefined>(undefined);
