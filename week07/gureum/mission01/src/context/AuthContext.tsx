import { createContext } from "react";
import type { RequestSigninDto } from "../types/auth";

interface UserInfo {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
}

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: UserInfo | null;
  login: (signInData: RequestSigninDto) => Promise<boolean>; // 로그인 성공/실패 유무
  logout: () => Promise<void>;
  fetchUserInfo: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  userInfo: null,
  login: async () => {
    return false;
  },
  logout: async () => {},
  fetchUserInfo: async () => {},
});

export default AuthContext;