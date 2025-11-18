import { useInfiniteQuery } from "@tanstack/react-query";
import { LpAPI } from "../../apis/lp/lpAxios";
import type { LpResponse } from "../../types/lp/lp";

export const useInfiniteLpQuery = (
  order: "asc" | "desc",
  limit: number,
  search?: string
) => {
  return useInfiniteQuery<LpResponse>({
    queryKey: ["lps", order, limit, search],
    queryFn: ({ pageParam = 0 }) =>
      LpAPI(order, pageParam as number | null, limit, search),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
  });
};
