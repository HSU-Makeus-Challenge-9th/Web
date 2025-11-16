import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(
  cursor: number,
  limit?: number,
  search?: string,
  order?: "asc" | "desc"
) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, search, order }),
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

export default useGetInfiniteLpList;
