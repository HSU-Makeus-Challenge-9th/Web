import { useInfiniteQuery } from '@tanstack/react-query';
import { getLPs } from '../api/lps';
import type { SortOrder } from '../types/lp';

interface UseInfiniteLPsParams {
  order?: SortOrder;
  limit?: number;
}

export const useInfiniteLPs = ({ order = 'desc', limit = 10 }: UseInfiniteLPsParams = {}) => {
  return useInfiniteQuery({
    queryKey: ['lps', order],
    queryFn: ({ pageParam = 0 }) => getLPs({ order, limit, cursor: pageParam }),
    getNextPageParam: (lastPage) => {
      // API 응답에서 다음 커서 확인
      const data = lastPage.data;
      
      // 더 이상 데이터가 없으면 undefined 반환
      if (!data.data || data.data.length < limit) {
        return undefined;
      }
      
      // 마지막 아이템의 ID를 다음 커서로 사용
      const lastItem = data.data[data.data.length - 1];
      return lastItem.id;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};