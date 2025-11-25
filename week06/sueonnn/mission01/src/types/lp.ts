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
  data: boolean;
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
