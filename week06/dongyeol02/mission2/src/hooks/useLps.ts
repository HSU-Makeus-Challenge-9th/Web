// src/hooks/useLps.ts (useInfiniteQuery 기반)

import { useInfiniteQuery } from "@tanstack/react-query";

import type { AxiosResponse } from "axios";
import type { LpApiData } from "../types/lp";
import { Api } from "../api/authApi";
// LpApiFullResponse, LpApiData, LpItem, LpQueryParams 타입은 정의되어 있다고 가정합니다.

const DEFAULT_LIMIT = 10;

// API 호출 함수: pageParam (cursor)과 order를 인수로 받습니다.
const fetchLps = async ({
  pageParam = 0,
  order,
}: {
  pageParam: number;
  order: "asc" | "desc";
}): Promise<LpApiData> => {
  const url = "/v1/lps";
  const params = {
    cursor: pageParam, // 이전 페이지의 nextCursor를 다음 호출의 cursor로 사용
    limit: DEFAULT_LIMIT,
    order: order,
  };

  // 💡 Api.get(url, { params }) 호출 시 LpApiFullResponse를 가정합니다.
  const response: AxiosResponse<{ data: LpApiData }> = await Api.get(url, {
    params,
  });
  return response.data.data; // 실제 데이터 구조인 LpApiData (data, nextCursor, hasNext) 반환
};

/**
 * LP 목록을 무한 스크롤 형태로 가져오는 훅
 * @param order 현재 정렬 기준 ('asc' | 'desc')
 */
export const useLps = (order: "asc" | "desc") => {
  return useInfiniteQuery({
    // 💡 queryKey: 정렬 기준이 바뀔 때 새로운 목록을 가져오도록 의존성 설정
    queryKey: ["lps", order],

    // queryFn: pageParam을 cursor로 사용
    queryFn: ({ pageParam = 0 }) => fetchLps({ pageParam, order }),

    // 초기 시작 커서는 0으로 설정
    initialPageParam: 0,

    // 💡 getNextPageParam 구현: 마지막 페이지 데이터를 받아서 다음 커서를 반환
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext && lastPage.nextCursor !== null) {
        return lastPage.nextCursor; // 다음 페이지의 cursor 값
      }
      return undefined; // 더 이상 페이지가 없으면 undefined 반환
    },

    staleTime: 1000 * 60 * 1, // 1분 동안 fresh 상태 유지
  });
};
