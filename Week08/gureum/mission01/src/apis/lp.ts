import type { 
  LpListResponse, 
  LpDetailResponse, 
  LpListParams, 
  CommentListResponse, 
  CommentListParams, 
  CreateLpRequest, 
  CreateLpResponse, 
  UploadImageResponse,
  CreateCommentRequest,
  UpdateCommentRequest,
  CommentResponse,
  DeleteCommentResponse,
  UpdateLpRequest,
  UpdateLpResponse,
  DeleteLpResponse,
  CreateLikeResponse,
  DeleteLikeResponse
} from '../types/api';
import axiosInstance from './axios';

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

// 이미지 업로드 API (인증 필요)
export const uploadImage = async (file: File): Promise<UploadImageResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axiosInstance.post<UploadImageResponse>('/v1/uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// LP 생성 API
export const createLp = async (data: CreateLpRequest): Promise<CreateLpResponse> => {
  const response = await axiosInstance.post<CreateLpResponse>('/v1/lps', data);
  return response.data;
};

// 댓글 생성 API
export const createComment = async (lpId: number, data: CreateCommentRequest): Promise<CommentResponse> => {
  const response = await axiosInstance.post<CommentResponse>(`/v1/lps/${lpId}/comments`, data);
  return response.data;
};

// 댓글 수정 API
export const updateComment = async (lpId: number, commentId: number, data: UpdateCommentRequest): Promise<CommentResponse> => {
  const response = await axiosInstance.patch<CommentResponse>(`/v1/lps/${lpId}/comments/${commentId}`, data);
  return response.data;
};

// 댓글 삭제 API
export const deleteComment = async (lpId: number, commentId: number): Promise<DeleteCommentResponse> => {
  const response = await axiosInstance.delete<DeleteCommentResponse>(`/v1/lps/${lpId}/comments/${commentId}`);
  return response.data;
};

// LP 수정 API
export const updateLp = async (lpId: number, body: UpdateLpRequest): Promise<UpdateLpResponse> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, body);
  return data;
};

// LP 삭제 API
export const deleteLp = async (lpId: number): Promise<DeleteLpResponse> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return data;
};

// 좋아요 추가 API
export const createLike = async (lpId: number): Promise<CreateLikeResponse> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};

// 좋아요 취소 API
export const deleteLike = async (lpId: number): Promise<DeleteLikeResponse> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};
