import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const nickname = searchParams.get("nickname");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      if (nickname) {
        localStorage.setItem("nickname", nickname);
      }
      if (refreshToken) {
        sessionStorage.setItem("refreshToken", refreshToken);
      }

      window.dispatchEvent(new Event("storage"));

      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p>로그인 처리 중입니다...</p>
    </div>
  );
};

export default OAuthCallbackPage;
