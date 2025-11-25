import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../apis/axios";

interface CreateCommentPayload {
  lpId: number;
  content: string;
  order: 'asc' | 'desc';
}

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lpId, content }: CreateCommentPayload) => {
      const response = await axios.post(`/v1/lps/${lpId}/comments`, { content });
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['lpComments', variables.lpId, variables.order],
      });
    },
  });
};
