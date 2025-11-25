// src/hooks/useLpComments.ts

import { useInfiniteQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
// 💡 타입 임포트 경로를 실제 파일 구조에 맞게 수정하세요.
// 💡 타입 임포트 경로를 실제 파일 구조에 맞게 수정하세요.
import type { LpCommentApiData, LpCommentFullResponse } from "../types/lp";
import axiosInstance from "../api/axiosInstance";

const DEFAULT_LIMIT = 10;

// API 호출 함수
const fetchLpComments = async ({
  lpId,
  pageParam = 0,
  order,
}: {
  lpId: number;
  pageParam: number;
  order: "asc" | "desc";
}): Promise<LpCommentApiData> => {
  // 반환 타입은 LpCommentApiData (data, nextCursor, hasNext 객체)
  const url = `/v1/lps/${lpId}/comments`;

  const params = {
    cursor: pageParam,
    limit: DEFAULT_LIMIT,
    order: order,
  };

  try {
    const response: AxiosResponse<LpCommentFullResponse> =
      await axiosInstance.get(url, {
        params,
      });
    // 💡 이중 data 구조에서 실제 Comment 배열과 페이지 정보가 담긴 객체 (LpCommentApiData)를 반환
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error(`댓글 목록을 불러오지 못했습니다. LP ID: ${lpId}`);
  }
};

export const useLpComments = (lpId: number, order: "asc" | "desc") => {
  return useInfiniteQuery({
    queryKey: ["lpComments", lpId, order],
    queryFn: ({ pageParam = 0 }) => fetchLpComments({ lpId, pageParam, order }),
    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext && lastPage.nextCursor !== null) {
        return lastPage.nextCursor;
      }
      return undefined;
    },

    staleTime: 1000 * 5, // 댓글은 자주 변경되므로 짧게 설정
    enabled: !!lpId && !isNaN(lpId), // lpId가 유효할 때만 실행
  });
};
