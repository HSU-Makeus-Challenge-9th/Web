import { useContext } from 'react';
import { ThemeContext } from './ThemeContextObject';
import type { ThemeContextInterface } from './ThemeContextObject';

// TypeScript에서 정확한 타입을 보장
function useTheme(): ThemeContextInterface {
  // ThemeContext에서 현재 테마 상태와 함수들을 가져옵니다
  const context = useContext(ThemeContext);
  // Provider 외부에서 사용하면 에러를 발생시킵니다
  // 개발자가 실수를 바로 알 수 있게 해줍니다
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default useTheme;
