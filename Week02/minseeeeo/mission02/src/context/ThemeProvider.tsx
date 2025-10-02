import { createContext, useContext, useState, type PropsWithChildren } from "react";

// enum 대신 일반 객체로 정의하고 상수로 만듦 (as const)
export const THEME = {
    LIGHT: 'LIGHT',
    DARK: 'DARK',
} as const;

// 객체값들로부터 유니언타입 추론
type ThemeType = typeof THEME[keyof typeof THEME];

interface IThemeContext {
    theme: ThemeType;   // 추론된 값 사용
    toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<ThemeType>(THEME.LIGHT);

    const toggleTheme = (): void => {
        setTheme((preTheme): ThemeType =>
            preTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
        );
    }
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}


export const useTheme = () => {
    const context = useContext(ThemeContext);

    // Provider로 감싸주지 않았을 때, 에러 발생용
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    
    return context;
}