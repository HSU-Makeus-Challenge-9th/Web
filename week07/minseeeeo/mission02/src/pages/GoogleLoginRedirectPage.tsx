import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const GoogleLoginRedirectPage = () => {
  const navigate = useNavigate();
  const { setTokens } = useAuth();
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  // 렌더링 된 이후에 파라미터 가져오기
  useEffect(() => {
    const processGoogleLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      console.log("=== 구글 로그인 리다이렉트 처리 시작 ===");
      console.log("전체 URL:", window.location.href);
      console.log("파라미터:", urlParams.toString());

      const newAccessToken = urlParams.get("accessToken");
      const newRefreshToken = urlParams.get("refreshToken");
      console.log("가져온 accessToken:", newAccessToken);
      console.log("가져온 refreshToken:", newRefreshToken);

      // 토큰이 null이 아닐 때만 저장
      if (!newAccessToken || !newRefreshToken) {
        console.error("토큰을 받아오지 못했습니다!");
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        navigate("/login", { replace: true });
        return;
      }

      // 로컬스토리지 저장
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      // Context 상태도 업데이트
      setTokens(newAccessToken, newRefreshToken);

      console.log("토큰 저장 완료!");
      console.log("로컬스토리지 확인:", {
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
      });

      // redirectPath 확인
      const redirectPath = localStorage.getItem("redirectPath");
      console.log("저장된 redirectPath:", redirectPath);

      // 상태 업데이트가 반영될 시간을 주기 위해 약간의 지연
      await new Promise((resolve) => setTimeout(resolve, 100));

      // 사용 후 삭제 및 이동
      if (redirectPath) {
        localStorage.removeItem("redirectPath");
        console.log("redirectPath로 이동:", redirectPath);
        navigate(redirectPath, { replace: true });
      } else {
        console.log("홈으로 이동");
        navigate("/", { replace: true });
      }
    };

    processGoogleLogin();
  }, [setAccessToken, setRefreshToken, setTokens, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      구글 로그인 처리 중...
    </div>
  );
};

export default GoogleLoginRedirectPage;
