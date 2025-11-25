import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../apis/axios";

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lpId: number) => {
      const res = await API.delete(`lps/${lpId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpList"] });
      alert("게시글이 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("LP 삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다.");
    },
  });
};
