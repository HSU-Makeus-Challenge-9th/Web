import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../apis/axios";

export const useLikeMutation = () => {
  const queryClient = useQueryClient();

  const addLike = useMutation({
    mutationFn: async (lpId: number) => {
      const res = await API.post(`lps/${lpId}/likes`);
      return res.data;
    },
    onSuccess: (_, lpId) => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
    },
    onError: (err) => {
      console.error("좋아요 실패:", err);
      alert("좋아요에 실패했습니다.");
    },
  });

  const removeLike = useMutation({
    mutationFn: async (lpId: number) => {
      const res = await API.delete(`lps/${lpId}/likes`);
      return res.data;
    },
    onSuccess: (_, lpId) => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
    },
    onError: (err) => {
      console.error("좋아요 취소 실패:", err);
      alert("좋아요 취소에 실패했습니다.");
    },
  });

  return { addLike, removeLike };
};
