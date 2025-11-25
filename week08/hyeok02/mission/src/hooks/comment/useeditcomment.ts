import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../apis/axios";

interface EditCommentPayload {
  lpId: number;
  commentId: number;
  content: string;
  order: 'asc' | 'desc';
}

export const useEditComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lpId, commentId, content }: EditCommentPayload) => {
      const response = await axios.patch(`/v1/lps/${lpId}/comments/${commentId}`, { content });
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['lpComments', variables.lpId, variables.order],
      });
    },
  });
};
