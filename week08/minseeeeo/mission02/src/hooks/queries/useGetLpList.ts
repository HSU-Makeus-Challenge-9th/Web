import { useQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { PagenationDto } from "../../types/common";

function useGetLpList({ cursor, limit, search, order }: PagenationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () =>
      getLpList({
        cursor,
        limit,
        search,
        order,
      }),

    staleTime: 5 * 60 * 1_000, // 5분
    gcTime: 10 * 60 * 1_000, // 10분
    //enabled: Boolean(search),
    refetchInterval: 10 * 60 * 1_000, // 10분

    // 파라미터가 변경될 떄 이전 데이터 유지해서 UI 깜빡이미 줄임
    // keepPreviousData: true,
  });
}

export default useGetLpList;
