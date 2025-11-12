import { useInfiniteQuery } from "@tanstack/react-query";
import { LpCommentAPI } from "../../../apis/lp/lpCommentAxios";
import type { CommentResponse } from "../../../types/lp/comment";

export const useLpCommentInfiniteQuery = (
  lpId: number,
  order: "asc" | "desc" = "asc",
  limit: number = 5
) => {
  return useInfiniteQuery<CommentResponse>({
    queryKey: ["lpComments", lpId, order, limit],
    queryFn: ({ pageParam = 0 }) =>
      LpCommentAPI(lpId, pageParam as number | null, limit, order),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
  });
};
