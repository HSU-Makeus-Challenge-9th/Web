import { createContext } from 'react';
import type { Theme } from './ThemeContext';

export interface ThemeContextInterface {
  theme: Theme; // theme: 현재 테마 ('light' 또는 'dark')
  toggleTheme: () => void; // toggleTheme: 테마를 전환하는 함수
}

export const ThemeContext = createContext<ThemeContextInterface | undefined>(undefined);
