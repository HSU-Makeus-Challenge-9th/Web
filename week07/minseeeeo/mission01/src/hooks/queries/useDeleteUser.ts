import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../apis/lp";
import { useAuth } from "../useAuth";
import { useNavigate } from "react-router-dom";
import { QUERY_KEY, QUERY_KEY2 } from "../../constants/key";

function useDeleteUser() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteUser(),

    onSuccess: () => {
      console.log("회원 탈퇴 성공");
      // 모든 LP 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY2.lp] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpComments] });
      logout();
      navigate("/");
    },
  });
}

export default useDeleteUser;
