import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import type { UserSigninInformation } from "../../utils/validate";

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (userData: UserSigninInformation) => {
      return await login(userData);
    },
    onSuccess: () => {
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
    },
  });
};
