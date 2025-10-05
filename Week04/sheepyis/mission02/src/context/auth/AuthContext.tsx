import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AuthState, AuthPayload } from "../../types/auth/auth";
import {
  loadAuth,
  saveAuth,
  clearAuth as clearAuthStorage,
} from "../../utils/auth/authStorage";

type AuthContextType = AuthState & {
  setAuth: (p: AuthPayload) => void;
  clearAuth: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    accessToken: null,
    refreshToken: null,
    name: null,
  });

  useEffect(() => {
    setState(loadAuth());
  }, []);

  const setAuth = (p: AuthPayload) => {
    saveAuth(p);
    setState({
      accessToken: p.accessToken ?? null,
      refreshToken: p.refreshToken ?? null,
      name: p.name ?? null,
    });
  };

  const clearAuth = () => {
    clearAuthStorage();
    setState({ accessToken: null, refreshToken: null, name: null });
  };

  const value = useMemo(() => ({ ...state, setAuth, clearAuth }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
