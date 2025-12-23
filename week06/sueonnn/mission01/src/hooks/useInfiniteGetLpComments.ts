// src/hooks/useInfiniteGetLpComments.ts

import { useInfiniteQuery } from "@tanstack/react-query";
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
    // ✅ 쿼리 키 정의: ['lpComments', LP ID, 정렬 순서]
    queryKey: ["lpComments", lpId, order],

    queryFn: ({ pageParam = 0 }) =>
      getLpComments({
        lpId,
        cursor: pageParam as number,
        limit,
        order,
      }),

    initialPageParam: 0,

    // ✅ nextCursor/hasNext가 최상위 레벨에 있다고 가정하고 로직 수정
    getNextPageParam: (lastPage) => {
      // lastPage는 CursorBasedResponse 타입 전체 객체입니다.
      if (lastPage.hasNext) {
        return lastPage.nextCursor;
      }
      return undefined;
    },

    staleTime: 1000 * 60 * 5,
    enabled: lpId > 0,
  });
};
