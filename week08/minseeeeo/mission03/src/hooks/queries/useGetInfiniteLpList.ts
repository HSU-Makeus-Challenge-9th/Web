import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";

function useGetInfiniteLpList(
  limit?: number,
  search?: string,
  order?: "asc" | "desc"
) {
  return useInfiniteQuery({
    // 미션에는 debouncedQuery라고 해놨는데, search == debouncedQuery임
    // search는 이미 HomePage에서 디바운스된 값이므로, 이 값이 변경될 때만 쿼리 재실행
    queryKey: ["search", search || "", order],
    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, search, order }),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    // 빈 문자열이나 공백만 있는 경우 쿼리 실행하지 않음
    enabled: !search || (!!search && search.trim().length > 0),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}

export default useGetInfiniteLpList;
