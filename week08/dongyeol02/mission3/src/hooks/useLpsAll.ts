import {
  useInfiniteQuery,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import type { LpApiData } from "../types/lp";
import { Api } from "../api/authApi";

const DEFAULT_LIMIT = 10;

interface LpQueryParams {
  cursor: number;
  limit: number;
  order: "asc" | "desc";
}

/**
 * API 호출: cursor 기반 페이지네이션, 정렬 매개변수 포함
 */
const fetchLpsAll = async ({
  pageParam = 0,
  order,
}: {
  pageParam: number;
  order: "asc" | "desc";
}): Promise<LpApiData> => {
  const url = "/v1/lps";
  const params: LpQueryParams = {
    cursor: pageParam,
    limit: DEFAULT_LIMIT,
    order,
  };

  const response: AxiosResponse<{ data: LpApiData }> = await Api.get(url, {
    params,
  });

  return response.data.data;
};

/**
 * 무한 스크롤용 커스텀 훅
 */
export const useLpsAll = (order: "asc" | "desc") => {
  return useInfiniteQuery<
    LpApiData, // 서버에서 반환하는 각 페이지 데이터 타입 지정
    Error,
    LpApiData, // select or 변환 후 타입(일반적으로 동일)
    [string, "asc" | "desc"] // queryKey 타입
  >({
    queryKey: ["lpsAll", order],
    queryFn: ({ pageParam }: QueryFunctionContext) => {
      const cursor = (pageParam as number) ?? 0;
      return fetchLpsAll({ pageParam: cursor, order }); // fetchLpsAll 함수는 LpApiData 반환
    },
    getNextPageParam: (lastPage: LpApiData) => {
      return lastPage.hasNext ? lastPage.nextCursor ?? undefined : undefined;
    },
    initialPageParam: 0,
  });
};
