// 백엔드 API 응답 타입 정의

// 공통 응답 타입 (백엔드 실제 응답 구조에 맞춤)
export interface ApiResponse<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
}

// 태그 타입
export interface Tag {
  id: number;
  name: string;
}

// 좋아요 타입
export interface Like {
  id: number;
  userId: number;
  lpId: number;
}

// 작성자 타입
export interface Author {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

// LP 기본 타입
export interface Lp {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Like[];
}

// LP 상세 타입 (작성자 정보 포함)
export interface LpDetail extends Lp {
  author: Author;
}

// LP 목록 응답 타입
export interface LpListData {
  data: Lp[];
  nextCursor: number;
  hasNext: boolean;
}

export interface LpListResponse extends ApiResponse<LpListData> {}

// LP 상세 응답 타입
export interface LpDetailResponse extends ApiResponse<LpDetail> {}

// 댓글 타입 (API 응답 구조에 맞춤)
export interface Comment {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

// 댓글 목록 데이터
export interface CommentListData {
  data: Comment[];
  nextCursor: number;
  hasNext: boolean;
}

// 댓글 목록 응답 타입
export interface CommentListResponse extends ApiResponse<CommentListData> {}

// 정렬 타입 (백엔드 API에 맞춤)
export type SortOrder = 'asc' | 'desc';

// API 요청 파라미터 (백엔드 API 파라미터에 맞춤)
export interface LpListParams {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: SortOrder; // 백엔드에서는 order 파라미터 사용
}

// 댓글 목록 요청 파라미터
export interface CommentListParams {
  cursor?: number;
  limit?: number;
  order?: SortOrder;
}