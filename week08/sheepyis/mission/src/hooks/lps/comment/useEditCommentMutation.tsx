import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../../apis/axios";
import type { EditCommentPayload } from "../../../types/lp/comment";

export const useEditCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lpId, commentId, content }: EditCommentPayload) => {
      const res = await API.patch(`lps/${lpId}/comments/${commentId}`, {
        content,
      });
      return res.data;
    },
    onSuccess: (_, { lpId }) => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
    },
    onError: (error) => {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다. 다시 시도해주세요.");
    },
  });
};
