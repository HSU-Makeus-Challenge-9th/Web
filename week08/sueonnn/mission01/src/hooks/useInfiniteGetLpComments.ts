// src/hooks/useInfiniteGetLpComments.ts

import { useInfiniteQuery } from "@tanstack/react-query";
// 댓글 목록을 가져오는 API 함수 (경로 및 이름은 프로젝트에 맞게 가정)
import { getLpComments } from "../apis/lp";
import type { CursorBasedResponse } from "../types/common";
import { PAGINATION_ORDER } from "../types/common";
import type { CommentItem } from "../types/comment";

type CommentsListResponse = CursorBasedResponse<CommentItem[]>;

interface Props {
  lpId: number;
  limit: number;
  order: PAGINATION_ORDER;
}

export const useInfiniteGetLpComments = ({ lpId, limit, order }: Props) => {
  return useInfiniteQuery<CommentsListResponse, Error, CommentsListResponse>({
    // 1. 쿼리 키 정의: ['lpComments', LP ID, 정렬 순서]
    queryKey: ["lpComments", lpId, order],

    queryFn: ({ pageParam = 0 }) =>
      getLpComments({
        lpId,
        cursor: pageParam as number,
        limit,
        order,
      }),

    initialPageParam: 0, // 첫 페이지 커서는 0 (또는 null, undefined 등 서버 정의에 따름)

    // 2. 다음 페이지 커서(nextCursor) 추출 로직
    getNextPageParam: (lastPage) => {
      // LP 목록과 마찬가지로, nextCursor 정보는 lastPage.data 안에 있다고 가정
      const cursorData = lastPage.data;

      if (cursorData?.hasNext) {
        return cursorData.nextCursor;
      }
      // 더 이상 데이터가 없으면 undefined 반환
      return undefined;
    },

    // LP 상세 페이지에 접속했을 때만 데이터를 새로 가져오도록 설정
    staleTime: 1000 * 60 * 5,
    enabled: lpId > 0,
  });
};
