import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../../apis/axios";
import type { AddCommentPayload } from "../../../types/lp/comment";

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lpId, content }: AddCommentPayload) => {
      const res = await API.post(`lps/${lpId}/comments`, { content });
      return res.data;
    },

    onSuccess: (_, { lpId }) => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
    },

    onError: (error) => {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
    },
  });
};
