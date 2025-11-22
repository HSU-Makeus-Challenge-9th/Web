import { useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '../api/comments';
import type { CommentSortOrder } from '../types/comment';

interface UseInfiniteCommentsParams {
  lpId: string;
  order?: CommentSortOrder;
  limit?: number;
}

export const useInfiniteComments = ({
  lpId,
  order = 'desc',
  limit = 5,
}: UseInfiniteCommentsParams) => {
  return useInfiniteQuery({
    queryKey: ['lpComments', lpId, order],
    queryFn: ({ pageParam = 0 }) =>
      getComments({ lpId, cursor: pageParam, limit, order }),
    getNextPageParam: (lastPage) => {
      const data = lastPage.data;
      return data.hasNext ? data.nextCursor : undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
};