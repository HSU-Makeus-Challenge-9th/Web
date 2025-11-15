export type LpItem = {
  id: number;
  title: string;
  thumbnail: string;
  createdAt: string;
  likes: { id: number; userId: number; lpId: number }[];
};

export type LpResponse = {
  data: LpItem[];
  nextCursor: number | null;
  hasNext: boolean;
};

export type LpDetailItem = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  authorId: number;
  likes: { id: number; userId: number; lpId: number }[];
  tags: { id: number; name: string }[];
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
};

export type LpDetailResponse = {
  data: LpDetailItem;
};
