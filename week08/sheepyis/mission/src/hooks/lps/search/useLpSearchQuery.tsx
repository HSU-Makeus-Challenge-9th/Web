import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "../../../apis/axios";
import type { LpSearchPage } from "../../../types/lp/lp";

export function useLpSearchQuery(
  category: "제목" | "태그",
  query: string,
  order: "asc" | "desc"
) {
  const trimmedQuery = query.trim();

  return useInfiniteQuery<LpSearchPage>({
    queryKey: ["search", category, trimmedQuery, order],

    queryFn: async ({ pageParam = 0 }) => {
      if (!trimmedQuery) {
        return {
          status: true,
          statusCode: 200,
          message: "",
          data: { data: [], nextCursor: null },
        };
      }

      if (category === "태그") {
        const res = await API.get(`lps/tag/${trimmedQuery}`, {
          params: {
            cursor: pageParam,
            limit: 10,
            search: "",
            order,
          },
        });

        return res.data as LpSearchPage;
      }

      const res = await API.get(`lps`, {
        params: {
          cursor: pageParam,
          limit: 10,
          search: trimmedQuery,
          order,
        },
      });

      return res.data as LpSearchPage;
    },

    getNextPageParam: (lastPage) => lastPage.data.nextCursor ?? undefined,
    enabled: trimmedQuery.length > 0,
    staleTime: 1000 * 10,
    gcTime: 1000 * 30,
    initialPageParam: 0,
  });
}
