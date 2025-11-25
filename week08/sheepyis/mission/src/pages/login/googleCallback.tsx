import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigation } from "../../hooks/useNavigation";
import { useAuth } from "../../context/auth/AuthContext";

const GoogleCallback = () => {
  const [params] = useSearchParams();
  const { handleMoveClick } = useNavigation();
  const { setAuth } = useAuth();

  useEffect(() => {
    const accessToken = params.get("access") || params.get("accessToken");
    const refreshToken = params.get("refresh") || params.get("refreshToken");
    const name = params.get("name");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      if (name) localStorage.setItem("name", name);

      setAuth({
        accessToken,
        refreshToken,
        name: name ?? "구글 사용자",
      });

      handleMoveClick("/");
    } else {
      alert("로그인 실패하셨습니다. 다시 시도해주세요.");
      handleMoveClick("/login");
    }
  }, []);

  return <div>구글 로그인 처리 중입니다...</div>;
};

export default GoogleCallback;
