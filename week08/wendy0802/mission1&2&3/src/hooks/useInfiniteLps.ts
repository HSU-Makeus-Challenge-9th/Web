import { useInfiniteQuery } from "@tanstack/react-query";
import { lpAPI } from "../apis/apis";
import type { GetLPsResponse } from "../apis/apis";

interface UseInfiniteLpsOptions {
  enabled?: boolean;
}

export const useInfiniteLps = (
  order: "asc" | "desc",
  search?: string,
  options?: UseInfiniteLpsOptions
) => {
  return useInfiniteQuery({
    queryKey: ["lps", order, search ?? ""],
    queryFn: async ({ pageParam }) => {
      const response: GetLPsResponse = await lpAPI.getLPs({
        cursor: pageParam ?? undefined,
        order,
        limit: 30,
        ...(search ? { search } : {}),
      });
      if (response.status && response.data) {
        return response.data;
      }
      throw new Error("LP 목록을 불러올 수 없습니다.");
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    enabled: options?.enabled ?? true,
  });
};
