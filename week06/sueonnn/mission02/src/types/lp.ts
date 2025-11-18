import type { CursorBasedResponse } from "./common";
import type { CommonResponse } from "./common";

export interface Tag {
  id: number;
  name: string;
}

export interface Likes {
  id: number;
  userId: number;
  lpId: number;
}

export interface LpAuthor {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

// 🚀 MODIFIED: export type 대신 export interface 사용
export interface LpItem {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Likes[];
  // 상세 조회 시에만 author 정보가 포함될 수 있음
  author?: LpAuthor;
}

// GET /v1/lps 등의 목록 조회 응답 타입
export type ResponseLpListDto = CursorBasedResponse<{
  data: LpItem[];
}>;

// Lp 생성/상세/업데이트 응답 타입
export type ResponseLpDetailDto = CommonResponse<{
  data: LpItem;
}>;

// Lp 삭제 응답 타입
export type ResponseDeleteLpDto = CommonResponse<{
  data: boolean; // UMC 스웨거에 "data": true 로 되어있어 boolean으로 가정
}>;

// Lp 생성 시 요청 본문 타입
export type CreateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

// Lp 업데이트 시 요청 본문 타입
export type UpdateLpDto = Partial<CreateLpDto>;

export interface CommentAuthor {
  // LpAuthor와 유사하지만 댓글 전용
  id: number;
  name: string; // 응답에 따라 name 또는 nickname
  email: string;
  // ...
}

export interface Comment {
  // LpDetailScreen의 Comments 타입을 댓글 목록 구조에 맞게 정의
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: CommentAuthor; // 댓글 작성자 정보 포함
}

// 댓글 목록 API 응답 타입 (고객님께서 주신 JSON에 맞춤)
export type ResponseCommentListDto = CursorBasedResponse<{
  data: Comment[];
}>;
