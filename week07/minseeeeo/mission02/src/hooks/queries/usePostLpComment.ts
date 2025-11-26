import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLpComment } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function usePostLpComment(lpId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => postLpComment(lpId, content),
    onSuccess: (data) => {
      console.log("댓글 생성 성공:", data);
      // 댓글목록 쿼리 무효화하여 자동 새로고침
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpComments] });
    },
    onError: (error) => {
      console.error("댓글 생성 실패:", error);
    },
  });
}

export default usePostLpComment;
