import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { useNavigate } from "react-router-dom";

function useDeleteLp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: number) => deleteLp(id),

    onSuccess: () => {
      console.log("LP 삭제 성공");
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      navigate("/", { replace: true });
    },
    onError: () => {
      console.log("LP 삭제 과정에서 에러 발생");
    },
  });
}

export default useDeleteLp;
