import { createContext } from 'react';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateTokens: (accessToken: string, refreshToken: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);