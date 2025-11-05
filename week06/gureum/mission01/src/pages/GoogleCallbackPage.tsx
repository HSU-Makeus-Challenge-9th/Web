import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const processGoogleCallback = async () => {
      try {
        // 백엔드에서 URL 파라미터로 전달한 토큰들을 추출
        const userId = searchParams.get("userId");
        const name = searchParams.get("name");
        const accessToken = searchParams.get("accessToken");
        const refreshToken = searchParams.get("refreshToken");
        const error = searchParams.get("error");

        if (error) {
          setStatus("error");
          setErrorMessage("Google 로그인이 취소되었습니다.");
          return;
        }

        if (!accessToken || !refreshToken) {
          setStatus("error");
          setErrorMessage("토큰 정보를 찾을 수 없습니다.");
          return;
        }

        console.log("Google OAuth 콜백 처리 중...", { userId, name, hasTokens: !!(accessToken && refreshToken) });
        
        // localStorage에 토큰 저장 (AuthProvider와 동기화)
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
        
        setStatus("success");
        
        // 성공 메시지
        alert(`${name || "사용자"}님, Google 로그인 성공!`);
        
        // 성공 시 MyPage로 이동
        setTimeout(() => {
          navigate("/my");
        }, 1500);
      } catch (error) {
        console.error("Google 콜백 처리 실패:", error);
        setStatus("error");
        setErrorMessage(
          error instanceof Error 
            ? error.message 
            : "Google 로그인 중 오류가 발생했습니다."
        );
      }
    };

    processGoogleCallback();
  }, [searchParams, navigate]);

  const handleRetry = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 text-white">
      <div className="max-w-md w-full text-center">
        {status === "processing" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Google 로그인 처리중</h2>
            <p className="text-gray-400">잠시만 기다려주세요...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">로그인 성공!</h2>
            <p className="text-gray-400">마이페이지로 이동합니다...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">로그인 실패</h2>
            <p className="text-gray-400 mb-6">{errorMessage}</p>
            <button
              onClick={handleRetry}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              다시 시도
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleCallbackPage;