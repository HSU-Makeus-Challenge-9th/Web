import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";
import { useAuth } from "../useAuth";
import { useNavigate } from "react-router-dom";

function usePostLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => postLogout(),

    onSuccess: () => {
      console.log("로그아웃 성공");
      logout();
      navigate("/", { replace: true });
    },
    onError: () => {
      console.log("로그아웃 과정에서 에러 발생");
    },
  });
}

export default usePostLogout;
