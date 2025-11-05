import { PrivateAPI } from './axios';
import type { CommentListResponse, GetCommentsParams } from '../types/comment';

//lp 댓글 조회
export const getLpComments = async ({
  lpId,
  cursor = 0,
  limit = 10,
  order = 'asc',
}: GetCommentsParams) => {
  const response = await PrivateAPI.get<CommentListResponse>(
    `/lps/${lpId}/comments`,
    {
      params: { cursor, limit, order },
    }
  );
  return response.data.data;
};
