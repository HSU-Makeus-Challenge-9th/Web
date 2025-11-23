export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  lpId: number;
  author: {
    id: number;
    name: string;
    email?: string;
    avatar?: string;
  };
}

export interface CommentListResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    data: Comment[];
    nextCursor: number;
    hasNext: boolean;
  };
}

export type CommentSortOrder = 'asc' | 'desc';