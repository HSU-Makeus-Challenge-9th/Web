import { useQuery } from '@tanstack/react-query';
import { getLPDetail } from '../api/lps';

export const useLPDetail = (lpId: string) => {
  return useQuery({
    queryKey: ['lp', lpId],
    queryFn: () => getLPDetail(lpId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};