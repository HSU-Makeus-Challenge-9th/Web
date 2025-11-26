import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLp } from "../../apis/lp";
import type { RequestLpPostDto } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";

function usePostLp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lpContent: RequestLpPostDto) => postLp(lpContent),
    onSuccess: (data) => {
      console.log("LP 생성 성공:", data);
      // LP 목록 쿼리 무효화하여 자동 새로고침
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
    },
    onError: (error) => {
      console.error("LP 생성 실패:", error);
    },
  });
}

export default usePostLp;
