import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';
import axios from '../apis/axios'; 

export interface Comment {
  id: number;
  content: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

interface CommentsPage {
  data: Comment[];
  nextCursor?: number;
  hasNext: boolean;
}

export const useInfiniteComments = (lpId: number, order: 'asc' | 'desc') =>
  useInfiniteQuery<CommentsPage, Error>({
    queryKey: ['lpComments', lpId, order],
    queryFn: async ({ pageParam }: QueryFunctionContext) => {
      const cursor = typeof pageParam === 'number' ? pageParam : 0;
      const url = `/v1/lps/${lpId}/comments?cursor=${cursor}&limit=10&order=${order}`;
      console.log('📡 요청 URL:', url);

      const res = await axios.get(url, { withCredentials: true });
      console.log('📡 HTTP 응답 상태코드:', res.status);

      const json = res.data;
      console.log('📡 API 응답 내용 (원본 그대로):', json);

      const wrapper = json.data ?? json;
      console.log('📡 API 응답 내용 (data.data):', wrapper.data);

      const arr: Comment[] = Array.isArray(wrapper.data) ? wrapper.data : [];
      console.log('📡 파싱된 댓글 배열:', arr);

      return {
        data: arr,
        nextCursor: wrapper.nextCursor ?? json.nextCursor,
        hasNext: wrapper.hasNext ?? json.hasNext,
      } as CommentsPage;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
  });
