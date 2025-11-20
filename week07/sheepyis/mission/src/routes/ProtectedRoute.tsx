import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";
import { API } from "../apis/axios";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken } = useAuth();
  const prevTokenRef = useRef<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      window.alert("로그인을 해주세요.");
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken && prevTokenRef.current !== accessToken) {
      prevTokenRef.current = accessToken;
      API.get("/auth/protected", {
        transformRequest: [
          (data) => {
            return data;
          },
        ],
      }).catch((err) => {
        console.error("[ProtectedRoute] 요청 실패:", err.response?.data || err);
      });
    }
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
