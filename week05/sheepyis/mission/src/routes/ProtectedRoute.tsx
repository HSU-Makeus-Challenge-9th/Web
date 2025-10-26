import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) {
      window.alert("로그인을 해주세요.");
    }
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
