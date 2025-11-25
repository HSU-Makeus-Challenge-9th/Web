import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../apis/axios";

export const useEditMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lpId, payload }: { lpId: number; payload: any }) => {
      const res = await API.patch(`lps/${lpId}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail"] });
      alert("게시글이 수정되었습니다.");
    },
    onError: (error) => {
      console.error("LP 수정 실패:", error);
      alert("게시글 수정에 실패했습니다.");
    },
  });
};
