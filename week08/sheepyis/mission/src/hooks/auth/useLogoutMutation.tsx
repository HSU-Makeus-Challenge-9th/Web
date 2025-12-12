import { useMutation } from "@tanstack/react-query";
import { API } from "../../apis/axios";
import { useAuth } from "../../context/auth/AuthContext";
import { useNavigation } from "../useNavigation";

export const useLogoutMutation = () => {
  const { clearAuth } = useAuth();
  const { handleMoveClick } = useNavigation();

  return useMutation({
    mutationFn: async () => {
      const res = await API.post("auth/signout");
      return res.data;
    },
    onSuccess: () => {
      clearAuth();
      alert("로그아웃 되었습니다.");
      handleMoveClick("/");
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 문제가 발생했습니다.");
    },
  });
};
