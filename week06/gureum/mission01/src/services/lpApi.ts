import type { LpListResponse, LpDetailResponse, LpListParams, CommentListResponse, CommentListParams } from '../types/api';
import axiosInstance from '../apis/axios';

// LP 목록 조회 API
export const fetchLpList = async (params: LpListParams = {}): Promise<LpListResponse> => {
  const searchParams = new URLSearchParams();
  
  if (params.cursor !== undefined) {
    searchParams.append('cursor', params.cursor.toString());
  }
  if (params.limit) {
    searchParams.append('limit', params.limit.toString());
  } else {
    searchParams.append('limit', '10'); // 기본값
  }
  if (params.search) {
    searchParams.append('search', params.search);
  }
  if (params.order) {
    searchParams.append('order', params.order);
  }

  const queryString = searchParams.toString();
  const url = `/v1/lps${queryString ? `?${queryString}` : ''}`;
  
  const response = await axiosInstance.get<LpListResponse>(url);
  return response.data;
};

// LP 상세 조회 API
export const fetchLpDetail = async (lpId: number): Promise<LpDetailResponse> => {
  const response = await axiosInstance.get<LpDetailResponse>(`/v1/lps/${lpId}`);
  return response.data;
};

// 특정 사용자별 LP 목록 조회 API
export const fetchUserLpList = async (userId: number, params: LpListParams = {}): Promise<LpListResponse> => {
  const searchParams = new URLSearchParams();
  
  if (params.cursor !== undefined) {
    searchParams.append('cursor', params.cursor.toString());
  }
  if (params.limit) {
    searchParams.append('limit', params.limit.toString());
  } else {
    searchParams.append('limit', '10');
  }
  if (params.search) {
    searchParams.append('search', params.search);
  }
  if (params.order) {
    searchParams.append('order', params.order);
  }

  const queryString = searchParams.toString();
  const url = `/v1/lps/user/${userId}${queryString ? `?${queryString}` : ''}`;
  
  const response = await axiosInstance.get<LpListResponse>(url);
  return response.data;
};

// 내가 생성한 LP 목록 조회 API
export const fetchMyLpList = async (params: LpListParams = {}): Promise<LpListResponse> => {
  const searchParams = new URLSearchParams();
  
  if (params.cursor !== undefined) {
    searchParams.append('cursor', params.cursor.toString());
  }
  if (params.limit) {
    searchParams.append('limit', params.limit.toString());
  } else {
    searchParams.append('limit', '10');
  }
  if (params.search) {
    searchParams.append('search', params.search);
  }
  if (params.order) {
    searchParams.append('order', params.order);
  }

  const queryString = searchParams.toString();
  const url = `/v1/lps/user${queryString ? `?${queryString}` : ''}`;
  
  const response = await axiosInstance.get<LpListResponse>(url);
  return response.data;
};

// LP 댓글 목록 조회 API
export const fetchLpComments = async (lpId: number, params: CommentListParams = {}): Promise<CommentListResponse> => {
  const searchParams = new URLSearchParams();
  
  if (params.cursor !== undefined) {
    searchParams.append('cursor', params.cursor.toString());
  }
  if (params.limit) {
    searchParams.append('limit', params.limit.toString());
  } else {
    searchParams.append('limit', '10'); // 기본값
  }
  if (params.order) {
    searchParams.append('order', params.order);
  }

  const queryString = searchParams.toString();
  const url = `/v1/lps/${lpId}/comments${queryString ? `?${queryString}` : ''}`;
  
  const response = await axiosInstance.get<CommentListResponse>(url);
  return response.data;
};