import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { deleteLpComment, patchLpComment } from "../../apis/comment";
import { queryClient } from "./../../App";

export const usePatchComment = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => patchLpComment({ lpId, commentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpComments, lpId] });
    },
  });
};

export const useDeleteComment = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteLpComment({ lpId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpComments, lpId] });
    },
  });
};
