import { useState, type PropsWithChildren } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { RequestSigninDto } from "../types/auth";
import { postLogout, postSignin } from "../apis/auth";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  // 로컬 스토리지 훅
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  // 상태 관리용
  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  // 로그인 함수
  const login = async (signInData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signInData);
      // 데이터를 잘 가져왔다면, 로컬스토리지에 토큰 저장 및 상태 업데이트
      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        alert("로그인 성공~!");
        return true;
      }
    } catch (error) {
      console.error("로그인 오류 발생: ", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
    return false;
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await postLogout();

      // 로컬 스토리지에서 토큰 제거
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      // 상태 초기화
      setAccessToken(null);
      setRefreshToken(null);

      alert("로그아웃 성공~!");
    } catch (error) {
      console.error("로그아웃 오류 발생: ", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
