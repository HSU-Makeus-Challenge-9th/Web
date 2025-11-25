import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  name: string | null;
};
export type AuthPayload = Required<AuthState>;

type Ctx = AuthState & {
  setAuth: (p: AuthPayload) => void;
  clearAuth: () => void;
};

const AuthContext = createContext<Ctx | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuthState] = useLocalStorage<AuthState>("auth", {
    accessToken: null,
    refreshToken: null,
    name: null,
  });

  const setAuth = (p: AuthPayload) => setAuthState(p);
  const clearAuth = () =>
    setAuthState({ accessToken: null, refreshToken: null, name: null });

  return (
    <AuthContext.Provider value={{ ...auth, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
