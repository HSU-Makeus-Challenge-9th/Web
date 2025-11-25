// // src/hooks/useInfiniteGetLpList.ts
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { getLpList } from "../apis/lp";
// import type { CursorBasedResponse } from "../types/common";
// import type { LpItem } from "../types/lp";
// import { useDebounce } from "./useDebounce";

// interface Props {
//   limit: number;
//   search: string;
//   order: string; // asc | desc
// }

// // 백엔드 응답 구조
// // ResponseLpListDto = {
// //   data: {
// //     data: LpItem[],
// //     nextCursor: number,
// //     hasNext: boolean
// //   }
// // }

// export const useInfiniteGetLpList = ({ limit, search, order }: Props) => {
//   // 검색어 디바운스
//   const debouncedSearch = useDebounce(search, 300);

//   return useInfiniteQuery({
//     queryKey: ["lpList", debouncedSearch, order],

//     queryFn: ({ pageParam = 0 }) =>
//       getLpList({
//         cursor: pageParam,
//         limit,
//         search: debouncedSearch,
//         order,
//       }),

//     initialPageParam: 0,

//     // nextCursor 로직
//     getNextPageParam: (lastPage) => {
//       const pageData = lastPage.data;
//       if (pageData?.hasNext) {
//         return pageData.nextCursor;
//       }
//       return undefined;
//     },

//     /*
//      * 검색어가 없어도 항상 첫 페이지 불러오도록 변경
//      */
//     enabled: true,

//     staleTime: 1000 * 60 * 5,
//     cacheTime: 1000 * 60 * 10,
//   });
// };
// src/hooks/useInfiniteGetLpList.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../apis/lp"; // LP 목록 API 호출 함수
import type { CursorBasedResponse } from "../types/common";
import { PAGINATION_ORDER } from "../types/common"; // enum은 값으로도 사용되므로 일반 임포트
import type { LpItem } from "../types/lp";

// API 응답 타입 정의
type LPListResponse = CursorBasedResponse<LpItem[]>;

interface Props {
  limit: number;
  search: string; // 이미 디바운스된 검색어(또는 일반 검색어)
  order: PAGINATION_ORDER;
  enabled?: boolean; // 검색어가 비었을 때 쿼리 막기 위해 옵션으로 추가
}

export const useInfiniteGetLpList = ({
  limit,
  search,
  order,
  enabled = true, // 기본값은 true
}: Props) => {
  return useInfiniteQuery<LPListResponse, Error, LPListResponse>({
    queryKey: ["lpList", search, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpList({
        cursor: pageParam as number, // pageParam을 현재 커서로 사용
        limit,
        search,
        order,
      }),
    initialPageParam: 0, // 0부터 시작

    getNextPageParam: (lastPage) => {
      const cursorData = lastPage.data;

      if (cursorData?.hasNext) {
        return cursorData.nextCursor;
      }
      return undefined;
    },

    // 불필요한 재요청을 줄이기 위한 staleTime / cacheTime
    staleTime: 1000 * 60 * 5, // 5분 동안은 신선한 데이터로 간주
    cacheTime: 1000 * 60 * 10, // 10분 동안 캐시에 유지
    enabled, // 외부에서 제어 (빈 검색어면 false)
  });
};
