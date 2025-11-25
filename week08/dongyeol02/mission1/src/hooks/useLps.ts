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
  search?: string;
}

const fetchLps = async ({
  pageParam = 0,
  order,
  searchTerm,
}: {
  pageParam: number;
  order: "asc" | "desc";
  searchTerm?: string;
}): Promise<LpApiData> => {
  const url = "/v1/lps";
  const params: LpQueryParams = {
    cursor: pageParam,
    limit: DEFAULT_LIMIT,
    order,
  };

  if (searchTerm && searchTerm.trim().length > 0) {
    params.search = searchTerm.trim();
  }

  const response: AxiosResponse<{ data: LpApiData }> = await Api.get(url, {
    params,
  });
  return response.data.data;
};

export const useLps = (order: "asc" | "desc", searchTerm: string) => {
  const trimmedSearch = searchTerm.trim();

  return useInfiniteQuery<LpApiData, Error>({
    queryKey: ["lps", order, "search", trimmedSearch],
    queryFn: ({ pageParam }: QueryFunctionContext) => {
      //쿼리 함수에 전달되는 객체의 구조와 타입오류 때메 ,,, 확실히 명시하려고 사용함유 나 이런거 처음봄
      // pageParam은 unknown 타입이므로 number로 단언
      const cursor = (pageParam as number) ?? 0;
      return fetchLps({ pageParam: cursor, order, searchTerm: trimmedSearch });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext && lastPage.nextCursor !== null) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 2,
    enabled: trimmedSearch.length > 0,
  });
};
