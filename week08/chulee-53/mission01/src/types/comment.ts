import type { CursorBasedResponse } from "./common";

export type CommentAuthor = {
  id: number;
  name: string;
  avatar: string | null;
};

export type Comment = {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    author: CommentAuthor;
}

export type ResponseLpCommentsDto = CursorBasedResponse<Comment[]>;
