import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../apis/axios";
import type { LpDetailItem } from "../../types/lp/lp";

export const useLikeMutation = () => {
  const queryClient = useQueryClient();

  const addLike = useMutation({
    mutationFn: async (lpId: number) => {
      const res = await API.post(`lps/${lpId}/likes`);
      return res.data;
    },
    onMutate: async (lpId) => {
      await queryClient.cancelQueries({ queryKey: ["lpDetail", lpId] });

      const prevData = queryClient.getQueryData<LpDetailItem>([
        "lpDetail",
        lpId,
      ]);

      if (prevData) {
        queryClient.setQueryData(["lpDetail", lpId], {
          ...prevData,
          likes: [...prevData.likes, { id: Date.now(), userId: 0, lpId }],
        });
      }

      return { prevData };
    },
    onError: (err, lpId, context) => {
      console.error("좋아요 실패:", err);
      if (context?.prevData) {
        queryClient.setQueryData(["lpDetail", lpId], context.prevData);
      }
      alert("좋아요에 실패했습니다.");
    },
    onSettled: (data, error, lpId) => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
    },
  });

  const removeLike = useMutation({
    mutationFn: async (lpId: number) => {
      const res = await API.delete(`lps/${lpId}/likes`);
      return res.data;
    },
    onMutate: async (lpId) => {
      await queryClient.cancelQueries({ queryKey: ["lpDetail", lpId] });

      const prevData = queryClient.getQueryData<LpDetailItem>([
        "lpDetail",
        lpId,
      ]);

      if (prevData) {
        queryClient.setQueryData(["lpDetail", lpId], {
          ...prevData,
          likes: prevData.likes.slice(0, -1),
        });
      }

      return { prevData };
    },
    onError: (err, lpId, context) => {
      console.error("좋아요 취소 실패:", err);
      if (context?.prevData) {
        queryClient.setQueryData(["lpDetail", lpId], context.prevData);
      }
      alert("좋아요 취소에 실패했습니다.");
    },
    onSettled: (data, error, lpId) => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
    },
  });

  return { addLike, removeLike };
};
