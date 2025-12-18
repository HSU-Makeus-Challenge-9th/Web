import { useInfiniteQuery } from "@tanstack/react-query";
import { getTagNameLpList } from "../../apis/lp";

function useGetInfiniteTagLpList(
  tagName: string,
  cursor: number,
  limit?: number,
  order?: "asc" | "desc"
) {
  return useInfiniteQuery({
    // 지연된 검색어(태그명, debouncedQuery)를 queryKey에 포함
    // tagName은 이미 HomePage에서 디바운스된 값이므로, 이 값이 변경될 때만 쿼리 재실행
    queryKey: ["search", tagName || "", "tag", order],
    queryFn: ({ pageParam }) =>
      getTagNameLpList(tagName, { cursor: pageParam, limit, order }),
    initialPageParam: 0,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getNextPageParam: (lastPage, allPages) => {
      console.log("lastPage:", lastPage);
      console.log("allPages:", allPages);
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    // 빈 문자열이나 공백만 있는 경우 쿼리 실행하지 않음
    enabled: !!tagName && tagName.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}

export default useGetInfiniteTagLpList;
