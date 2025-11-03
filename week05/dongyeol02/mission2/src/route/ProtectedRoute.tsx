import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ProtectedRoute: React.FC = () => {
  const [token] = useLocalStorage<string>("accessToken", "");
  console.log(token);
  if (!token) {
    // 토큰 없으면 로그인 페이지로 리다이렉트 하기
    return <Navigate to="/login" replace />;
  }

  // 토큰이 있으면 보호된 컴포넌트 들어가기 가능
  return <Outlet />;
};

export default ProtectedRoute;
