import { createContext } from "react";
import type { RequestSigninDto } from "../types/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signInData: RequestSigninDto) => Promise<boolean>; // 로그인 성공/실패 유무
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {
    return false;
  },
  logout: async () => {},
});

export default AuthContext;