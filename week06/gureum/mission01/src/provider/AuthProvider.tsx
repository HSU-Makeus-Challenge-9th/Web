import { useState, useEffect, type PropsWithChildren } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { RequestSigninDto } from "../types/auth";
import { postLogout, postSignin, getMyInfo } from "../apis/auth";
import { AuthContext } from "../context/AuthContext";

interface UserInfo {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
}

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
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // 토큰 상태 동기화 (localStorage 변경 감지)
  useEffect(() => {
    const synchronizeTokensFromStorage = () => {
      const latestAccessToken = getAccessTokenFromStorage();
      const latestRefreshToken = getRefreshTokenFromStorage();
      
      setAccessToken(latestAccessToken);
      setRefreshToken(latestRefreshToken);
      
      console.log("📱 토큰 상태 동기화 완료:", { 
        hasAccessToken: Boolean(latestAccessToken), 
        hasRefreshToken: Boolean(latestRefreshToken) 
      });
    };

    // localStorage 변경 감지를 위한 이벤트 리스너 등록
    window.addEventListener('storage', synchronizeTokensFromStorage);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => {
      window.removeEventListener('storage', synchronizeTokensFromStorage);
    };
  }, [getAccessTokenFromStorage, getRefreshTokenFromStorage]);

  // 로그인 후 사용자 정보 자동 조회
  useEffect(() => {
    if (accessToken && !userInfo) {
      fetchUserInfo();
    }
  }, [accessToken]);

  // 사용자 정보 조회 함수
  const fetchUserInfo = async () => {
    try {
      if (!accessToken) return;
      
      const { data: userInfoResponse } = await getMyInfo();
      setUserInfo(userInfoResponse);
      console.log("✅ 사용자 정보 조회 성공:", userInfoResponse);
    } catch (error) {
      console.error("❌ 사용자 정보 조회 실패:", error);
    }
  };

  // 로그인 함수
  const handleUserLogin = async (signInCredentials: RequestSigninDto): Promise<boolean> => {
    try {
      const { data: loginResponse } = await postSignin(signInCredentials);
      
      if (loginResponse) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = loginResponse;

        // 토큰을 localStorage와 상태에 저장
        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        console.log("✅ 로그인 성공");
        alert("로그인 성공!");
        return true;
      }
    } catch (error) {
      console.error("❌ 로그인 중 오류 발생:", error);
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
      setUserInfo(null);

      alert("로그아웃 성공~!");
    } catch (error) {
      console.error("로그아웃 오류 발생: ", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      accessToken, 
      refreshToken, 
      userInfo,
      login: handleUserLogin, 
      logout,
      fetchUserInfo
    }}>
      {children}
    </AuthContext.Provider>
  );
};