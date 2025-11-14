import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../apis/axios";

interface DeleteCommentPayload {
  lpId: number;
  commentId: number;
  order: 'asc' | 'desc';
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lpId, commentId }: DeleteCommentPayload) => {
      const response = await axios.delete(`/v1/lps/${lpId}/comments/${commentId}`);
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['lpComments', variables.lpId, variables.order],
      });
    },
  });
};
