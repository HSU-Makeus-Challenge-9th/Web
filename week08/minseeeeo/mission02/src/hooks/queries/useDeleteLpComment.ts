import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLpComment } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

interface useDeleteCommentParams {
  lpId: number;
  commentId: number;
}

function useDeleteLpComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lpId, commentId }: useDeleteCommentParams) =>
      deleteLpComment(lpId, commentId),
    onSuccess: () => {
      console.log("댓글 삭제 성공");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpComments] });
    },
    onError: () => {
      console.log("댓글 삭제 도중, 에러가 발생하였습니다.");
    },
  });
}

export default useDeleteLpComment;
