import { useMutation } from "@tanstack/react-query";
import { API } from "../../apis/axios";
import { useNavigation } from "../useNavigation";
import { useAuth } from "../../context/auth/AuthContext";

export const useDeleteUserMutation = () => {
  const { handleMoveClick } = useNavigation();
  const { clearAuth } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const res = await API.delete("users");
      return res.data;
    },
    onSuccess: () => {
      alert("회원 탈퇴가 완료되었습니다.");
      clearAuth();
      handleMoveClick("/login");
    },
    onError: (error) => {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴에 실패했습니다.");
    },
  });
};
