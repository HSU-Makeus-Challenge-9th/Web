import { useInfiniteQuery } from "@tanstack/react-query";
import { lpAPI, type GetCommentsResponse } from "../apis/apis";

export const useInfiniteComments = (lpId: number, order: "asc" | "desc") => {
  return useInfiniteQuery({
    queryKey: ["lpComments", lpId, order],
    queryFn: async ({ pageParam }) => {
      const res: GetCommentsResponse = await lpAPI.getComments({
        lpId,
        cursor: (pageParam as number) ?? 0,
        order,
        limit: 20,
      });
      if (res.status) return res.data;
      throw new Error("댓글 목록을 불러올 수 없습니다.");
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};
