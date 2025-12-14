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

// LP 좋아요 토글 (상태에 따라 POST/DELETE)
export const toggleLPLike = async (lpId: string, isLiked: boolean) => {
  if (isLiked) {
    // 좋아요 취소
    const response = await axiosInstance.delete(`/lps/${lpId}/likes`);
    return response.data;
  } else {
    // 좋아요 추가
    const response = await axiosInstance.post(`/lps/${lpId}/likes`);
    return response.data;
  }
};

// 이미지 업로드
export const uploadImage = async (file: File): Promise<{ imageUrl: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post('/uploads/public', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data.data;
};

// LP 생성
interface CreateLPData {
  title: string;
  content: string;
  thumbnail: File;
  tags: string[];
}

export const createLP = async (data: CreateLPData) => {
  // 1단계: 이미지 먼저 업로드
  const { imageUrl } = await uploadImage(data.thumbnail);
  
  // 2단계: LP 생성 (이미지 URL 사용)
  const body = {
    title: data.title,
    content: data.content,
    thumbnail: imageUrl,  // 업로드된 이미지 URL
    tags: data.tags,
    published: true,
  };

  const response = await axiosInstance.post('/lps', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  return response.data;
};

// LP 수정
export interface UpdateLPData {
  title?: string;
  content?: string;
  thumbnail?: File | string; // File이면 새 업로드, string이면 기존 URL
  tags?: string[];
}

export const updateLP = async (lpId: string, data: UpdateLPData) => {
  let thumbnailUrl = data.thumbnail;
  
  // 새 이미지 파일이면 업로드
  if (data.thumbnail instanceof File) {
    const { imageUrl } = await uploadImage(data.thumbnail);
    thumbnailUrl = imageUrl;
  }
  
  const body: Record<string, unknown> = {};
  if (data.title !== undefined) body.title = data.title;
  if (data.content !== undefined) body.content = data.content;
  if (thumbnailUrl !== undefined) body.thumbnail = thumbnailUrl;
  if (data.tags !== undefined) body.tags = data.tags;

  const response = await axiosInstance.patch(`/lps/${lpId}`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  return response.data;
};

// 내가 좋아요 한 LP 목록
export const getMyLikedLPs = async (order: string = 'desc') => {
  const response = await axiosInstance.get('/lps/likes/me', {
    params: { 
      cursor: 0,
      limit: 100,
      order 
    },
  });
  return response.data;
};

// 내가 작성한 LP 목록  
export const getMyWrittenLPs = async (order: string = 'desc') => {
  const response = await axiosInstance.get('/lps/user', {
    params: { 
      cursor: 0,
      limit: 100,
      order 
    },
  });
  return response.data;
};