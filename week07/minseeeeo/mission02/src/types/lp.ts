import type { CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};
export type Like = {
  id: number;
  userId: number;
  lpId: number;
};

// 단일 LP 항목
export type LpItem = {
  id: number;
  title: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Like[];
};

// LP 목록 응답 (/v1/lps)
export type ResponseLpListDto = CursorBasedResponse<{
  data: LpItem[];
  nextCursor: number;
  hasNext: boolean;
}>;

// 단일 LP 상세 항목 (/v1/lps/:id)
export type ResponseLpDetailsDto = CursorBasedResponse<LpDetailsItem>;

type Author = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type LpDetailsItem = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Like[];
  author: Author;
};

export type ResponseLpCommentsDto = CursorBasedResponse<{
  data: LpCommentItem[];
  nextCursor: number;
  hasNext: boolean;
}>;

export type LpCommentItem = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
};

// (POST) /v1/lps - request
export type RequestLpPostDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

// (POST) /v1/lps - response
export type ResponseLpPostDto = CursorBasedResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}>;

// (DELETE) /v1/lps/:lpId/comments/:commentId
export type ResponseDeleteLpCommentDto = CursorBasedResponse<{
  message: string;
}>;

// (POST) /v1/lps/:id/comments - response
export type ResponsePostLpCommentDto = CursorBasedResponse<LpCommentItem>;

// (PATCH} /v1/lps/:id/comments/:commentId - response
export type ResponsePatchLpCommentDto = CursorBasedResponse<LpCommentItem>;

// (PATCH) /v1/users - request
export type RequestPatchUserInfo = {
  name: string;
  bio: string;
  avatar: string;
};

// (PATCH) /v1/users - response
export type ResponsePatchUserInfo = CursorBasedResponse<Author>;

// (PATCH) /v1/lps/:id - request
export type RequestPatchLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

// (PATCH) /v1/lps/:id - response
export type ResponsePatchLpDto = CursorBasedResponse<LpDetailsItem>;

// (DELETE) /v1/lps/:id - response
export type ResponseDeleteLpDto = CursorBasedResponse<{
  message: string;
}>;

// (PATCH) /v1/lps/:lpId - response
export type ResponsePatchLpInfo = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
};

// (POST) /v1/lps/:lpId/likes - response (좋아요 누름)
// (DELETE) /v1/lps/:lpId/likes - response (좋아요 취소)
export type ResponseLikeDto = CursorBasedResponse<{
  id: number;
  user: number;
  lpId: number;
}>;
