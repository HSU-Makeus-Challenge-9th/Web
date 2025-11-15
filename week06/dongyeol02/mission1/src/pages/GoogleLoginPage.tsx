import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const GoogleLoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // URL 쿼리 파라미터에서 값들을 읽기
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    const name = urlParams.get("name");

    // 1. 토큰들이 URL에 정상적으로 존재하는지 확인
    if (accessToken && refreshToken && name) {
      //  Context에 로그인 상태를 저장
      login(accessToken, refreshToken, name);

      // 3. 사용자를 메인 페이지로
      navigate("/", { replace: true });
    }
  }, [login, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      구글 로그인 처리 중...
    </div>
  );
};

export default GoogleLoginPage;
