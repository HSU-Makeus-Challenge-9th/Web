import { useContext } from 'react';
import { ThemeContext } from './ThemeContextObject';
import type { ThemeContextInterface } from './ThemeContextObject';

function useTheme(): ThemeContextInterface {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default useTheme;
