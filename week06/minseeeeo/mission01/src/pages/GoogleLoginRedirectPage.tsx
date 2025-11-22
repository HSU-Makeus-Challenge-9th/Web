import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";

const GoogleLoginRedirectPage = () => {
  const navigate = useNavigate();
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

    // localStorage에서 직접 가져오기
    const redirectPath = localStorage.getItem("redirectPath");
    console.log("저장된 redirectPath:", redirectPath);

    // 사용 후 삭제
    if (redirectPath) {
      localStorage.removeItem("redirectPath");
      navigate(redirectPath, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [setAccessToken, setRefreshToken, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      구글 로그인 처리 중...
    </div>
  );
};

export default GoogleLoginRedirectPage;
