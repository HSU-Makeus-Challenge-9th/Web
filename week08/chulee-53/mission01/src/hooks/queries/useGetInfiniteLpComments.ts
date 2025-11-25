import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpComments } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";
import type { PAGINATION_ORDER } from "../../enums/common";

function useGetInfiniteLpComments(
  lpId: number,
  order: PAGINATION_ORDER,
  limit = 10
) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lpComments, lpId, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpComments({ lpId, cursor: pageParam, limit, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
  });
}

export default useGetInfiniteLpComments;
