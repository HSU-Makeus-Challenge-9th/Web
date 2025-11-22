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
/* export type ResponseLpListDto = CursorBasedResponse<{
  data: {
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
}>; */

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
/* export type ResponseLpDetailsDto = CursorBasedResponse<{
  data: LpDetailsItem;
}>; */
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
