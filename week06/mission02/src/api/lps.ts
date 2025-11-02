import axiosInstance from './axiosInstance';
import type { LPListResponse, LPTagResponse, LPDetailResponse, SortOrder } from '../types/lp';

interface GetLPsParams {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: SortOrder;
}

export const getLPs = async (params: GetLPsParams = {}): Promise<LPListResponse> => {
  const { cursor = 0, limit = 10, search = '', order = 'desc' } = params;
  
  const response = await axiosInstance.get('/lps', {
    params: {
      cursor,
      limit,
      search,
      order,
    },
  });
  
  return response.data;
};

// LP 상세 조회
export const getLPDetail = async (lpId: string): Promise<LPDetailResponse> => {
  const response = await axiosInstance.get(`/lps/${lpId}`);
  return response.data;
};

// 태그로 LP 필터링
export const getLPsByTag = async (tagName: string): Promise<LPTagResponse> => {
  const response = await axiosInstance.get(`/lps/tag/${tagName}`);
  return response.data;
};

// LP 삭제
export const deleteLP = async (lpId: string) => {
  const response = await axiosInstance.delete(`/lps/${lpId}`);
  return response.data;
};

// LP 좋아요
export const toggleLPLike = async (lpId: string) => {
  const response = await axiosInstance.post(`/lps/${lpId}/like`);
  return response.data;
};