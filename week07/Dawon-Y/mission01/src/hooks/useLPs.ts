import { useQuery } from '@tanstack/react-query';
import { getLPs } from '../api/lps';
import type { SortOrder } from '../types/lp';

interface UseLPsParams {
  order?: SortOrder;
  search?: string;
  limit?: number;
}

export const useLPs = ({ order = 'desc', search = '', limit = 10 }: UseLPsParams = {}) => {
  return useQuery({
    queryKey: ['lps', order, search, limit],
    queryFn: () => getLPs({ order, search, limit }),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
};