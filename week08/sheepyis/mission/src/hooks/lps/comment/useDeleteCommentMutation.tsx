import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../../apis/axios";
import type { DeleteCommentPayload } from "../../../types/lp/comment";

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lpId, commentId }: DeleteCommentPayload) => {
      const res = await API.delete(`lps/${lpId}/comments/${commentId}`);
      return res.data;
    },
    onSuccess: (_, { lpId }) => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
    },
    onError: (error) => {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });
};
