import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLoginRedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  // 렌더링 된 이후에 파라미터 가져오기
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get("name"));

    setAccessToken(urlParams.get("accessToken"));
    setRefreshToken(urlParams.get("refreshToken"));

    window.location.href = "/my";
  }, [setAccessToken, setRefreshToken]);
  return <div>구글 로그인 리다이렉트 페이지</div>;
};

export default GoogleLoginRedirectPage;
