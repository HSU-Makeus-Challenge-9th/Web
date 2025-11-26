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
      // 로그아웃 API 호출 (실패해도 무시)
      await postLogout();
    } catch (error) {
      // 이미 세션이 만료되었거나 토큰이 유효하지 않은 경우
      // 에러를 무시하고 로컬 정리만 진행
      console.log("로그아웃 API 호출 실패 (무시):", error);
    } finally {
      // API 성공/실패 여부와 관계없이 항상 로컬 토큰 제거
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      // 상태 초기화
      setAccessToken(null);
      setRefreshToken(null);
    }
  };

  // 토큰 직접 설정 함수 (OAuth 리다이렉트 등에서 사용)
  const setTokens = (
    newAccessToken: string | null,
    newRefreshToken: string | null
  ) => {
    if (newAccessToken && newRefreshToken) {
      setAccessTokenInStorage(newAccessToken);
      setRefreshTokenInStorage(newRefreshToken);
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, login, logout, setTokens }}
    >
      {children}
    </AuthContext.Provider>
  );
};
