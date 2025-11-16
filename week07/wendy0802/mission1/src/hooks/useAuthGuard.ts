import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login", { replace: true });
      return;
    }
    setIsCheckingAuth(false);
  }, [navigate]);

  return isCheckingAuth;
};

