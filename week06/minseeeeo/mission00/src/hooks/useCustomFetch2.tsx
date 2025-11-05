// useQuery를 활용한 커스텀 훅

import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export const useCustomFetch2 = <T,>(
  url: string
): UseQueryResult<NoInfer<T>, Error> => {
  return useQuery({
    queryKey: [url],
    queryFn: async ({ signal }): Promise<T> => {
      const response = await fetch(url, { signal });

      // 400/500대 에러 처리
      if (!response.ok) {
        throw new Error("데이터 패치 실패: " + response.status);
      }

      return response.json() as Promise<T>;
    },
    retry: 3,

    // 지수 백오프 전략
    retryDelay: (attemptIndex) => {
      return Math.min(1_000 * 2 ** attemptIndex, 30_000);
    },

    staleTime: 5 * 60 * 1_000, // 5분

    // 쿼리가 사용되지 않은 채로 10분이 지나면, 캐시에서 삭제
    gcTime: 10 * 60 * 1_000, // 10분
  });
};
