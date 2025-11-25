import type { ReactNode } from 'react';
import { loginAPI } from '../api/auth';
import { useTokens } from '../hooks/useTokens';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const { accessToken, refreshToken, setTokens, clearTokens } = useTokens();

  const login = async (email: string, password: string) => {
    try {
      const result = await loginAPI(email, password);
      setTokens(result.accessToken, result.refreshToken);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    clearTokens();
  };

  const updateTokens = (newAccessToken: string, newRefreshToken: string) => {
    setTokens(newAccessToken, newRefreshToken);
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout, isAuthenticated, updateTokens }}>
      {children}
    </AuthContext.Provider>
  );
}