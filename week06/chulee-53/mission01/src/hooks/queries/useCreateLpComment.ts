import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLpComment } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";

export const useCreateLpComment = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => postLpComment({ lpId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, lpId],
      });
    },
  });
};
