import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/movie/LodingSpinner";

export const GoogleLoginRedirectPage = () => {
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const [userInfo, setUserInfo] = useState<{
    nickname: string;
    userId: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const nickname = params.get("name") || params.get("nickname");
    const userId = params.get("userId");

    console.log("구글 로그인 콜백 데이터:", {
      accessToken,
      refreshToken,
      nickname,
      userId,
    });

    if (accessToken && refreshToken) {
      login(accessToken, refreshToken);

      if (nickname) {
        localStorage.setItem("nickname", decodeURIComponent(nickname));
      }
      if (userId) {
        localStorage.setItem("userId", userId);
      }

      setUserInfo({
        nickname: decodeURIComponent(nickname || "사용자"),
        userId: userId || "",
      });
      setIsLoading(false);
    } else {
      alert("로그인에 실패했습니다.");
      navigate("/login");
    }
  }, [navigate, login]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-blue-100">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 shadow-2xl max-w-md w-full mx-4">
        <h1 className="text-white text-3xl font-bold text-center mb-8">
          {userInfo?.nickname}님 환영합니다!
        </h1>

        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-sky-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-4xl font-bold">
              {userInfo?.nickname?.substring(0, 2) || "환영"}
            </span>
          </div>
        </div>
        <div className="mb-6 space-y-3">
          <button
            onClick={handleGoHome}
            className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium shadow-lg transition-colors"
          >
            홈으로 가기
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-4 bg-gray-500 hover:bg-purple-600 text-white rounded-xl font-medium shadow-lg transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};
