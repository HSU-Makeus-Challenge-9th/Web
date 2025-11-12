import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getLpComments } from "../../apis/lp";

function useGetInfiniteLpComments(
  lpId: number,
  order?: "asc" | "desc",
  cursor?: number,
  limit?: number
) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lpComments, limit, order],
    queryFn: ({ pageParam }) =>
      getLpComments({ lpId, order, cursor: pageParam, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      console.log("lastPage:", lastPage);
      console.log("allPages:", allPages);
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}

export default useGetInfiniteLpComments;
