import { createContext, type ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { signout } from "../api/authApi";

// Context에 어떤 값들이 들어갈지 타입 정의
interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  name: string | null;
  login: (accessToken: string, refreshToken: string, name: string) => void;
  logout: () => void;
}

// 1. Context 생성 (초기값은 null)
const AuthContext = createContext<AuthContextType | null>(null);

// 2. Provider 컴포넌트 생성
export function AuthProvider({ children }: { children: ReactNode }) {
  // useLocalStorage 훅으로 accessToken 상태를 관리!
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "accessToken",
    null
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "refreshToken",
    null
  );
  const [name, setName] = useLocalStorage<string | null>("name", null);

  const login = (accessToken: string, refreshToken: string, name: string) => {
    setRefreshToken(refreshToken);
    setAccessToken(accessToken);
    setName(name); // 이 함수가 호출되면 상태와 localStorage가 모두 업데이트
  };

  const logout = async () => {
    try {
      const response = await signout();
      console.log(response);
    } catch (error) {
      console.error("로그아웃 실패.,.", error);
    } finally {
      setAccessToken(null);
      setRefreshToken(null);
      setName(null);
    }
  };

  // Context를 통해 내려줄 값들
  const value = { accessToken, refreshToken, name, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthProvider안에서 사용..!");
  }
  return context;
}
