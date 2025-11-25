import axiosInstance from './axiosInstance';
import type { CommentListResponse, CommentSortOrder } from '../types/comment';

interface GetCommentsParams {
  lpId: string;
  cursor?: number;
  limit?: number;
  order?: CommentSortOrder;
}

// 댓글 목록 조회
export const getComments = async ({
  lpId,
  cursor = 0,
  limit = 10,
  order = 'desc',
}: GetCommentsParams): Promise<CommentListResponse> => {
  const response = await axiosInstance.get(`/lps/${lpId}/comments`, {
    params: {
      cursor,
      limit,
      order,
    },
  });
  return response.data;
};

// 댓글 작성
export const createComment = async (lpId: string, content: string) => {
  const response = await axiosInstance.post(`/lps/${lpId}/comments`, {
    content,
  });
  return response.data;
};

// 댓글 삭제
export const deleteComment = async (lpId: string, commentId: number) => {
  const response = await axiosInstance.delete(`/lps/${lpId}/comments/${commentId}`);
  return response.data;
};

// 댓글 수정
export const updateComment = async (lpId: string, commentId: number, content: string) => {
  const response = await axiosInstance.patch(`/lps/${lpId}/comments/${commentId}`, {
    content,
  });
  return response.data;
};