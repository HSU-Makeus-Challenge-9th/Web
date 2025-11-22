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
