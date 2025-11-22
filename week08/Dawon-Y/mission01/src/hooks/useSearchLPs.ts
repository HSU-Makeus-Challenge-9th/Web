import { useInfiniteQuery } from '@tanstack/react-query';
import { getLPs } from '../api/lps';
import type { SortOrder } from '../types/lp';

export type SearchType = 'title' | 'content' | 'tag';

interface UseSearchLPsParams {
  query: string;
  searchType?: SearchType;
  order?: SortOrder;
  limit?: number;
}

export const useSearchLPs = ({ 
  query, 
  searchType = 'title',
  order = 'desc', 
  limit = 10 
}: UseSearchLPsParams) => {
  return useInfiniteQuery({
    queryKey: ['search', query, searchType, order],
    queryFn: ({ pageParam = 0 }) => getLPs({ 
      order, 
      limit, 
      cursor: pageParam,
      search: query,
    }),
    getNextPageParam: (lastPage) => {
      const data = lastPage.data;
      
      if (!data.data || data.data.length < limit) {
        return undefined;
      }
      
      const lastItem = data.data[data.data.length - 1];
      return lastItem.id;
    },
    initialPageParam: 0,
    // 빈 검색어일 땐 쿼리 실행 안 함
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

export default useSearchLPs;