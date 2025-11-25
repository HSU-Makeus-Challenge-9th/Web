import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchLpComment } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

interface usePatchLpCommentParams {
  lpId: number;
  commentId: number;
  content: string;
}

function usePatchLpComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lpId, commentId, content }: usePatchLpCommentParams) =>
      patchLpComment(lpId, commentId, content),
    onSuccess: (data) => {
      console.log("LP 댓글 수정 성공:", data);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpComments] });
    },
    onError: () => {
      console.error("LP 댓글 수정 실패:");
    },
  });
}

export default usePatchLpComment;
