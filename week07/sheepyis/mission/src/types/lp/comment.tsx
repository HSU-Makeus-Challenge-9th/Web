export type CommentItem = {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
    avatar: string | null;
  };
};

export type CommentResponse = {
  data: CommentItem[];
  nextCursor: number | null;
  hasNext: boolean;
};

export interface AddCommentPayload {
  lpId: number;
  content: string;
}

export interface EditCommentPayload {
  lpId: number;
  commentId: number;
  content: string;
}

export interface DeleteCommentPayload {
  lpId: number;
  commentId: number;
}
