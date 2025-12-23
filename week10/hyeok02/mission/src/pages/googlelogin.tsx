import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken"); 

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      console.log("accessToken 저장 완료:", accessToken);

      if (refreshToken) {
        sessionStorage.setItem("refreshToken", refreshToken);
        console.log("refreshToken 저장 완료:", refreshToken);
      }

      navigate("/", { replace: true }); 
    } else {
      console.error("accessToken이 없습니다.");
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
