export interface Tag {
  id: number;
  name: string;
}

export interface Like {
  id: number;
  userId: number;
  lpId: number;
}

export interface Author {
  id: number;
  name: string;
  email?: string;
}

export interface LP {
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
  author?: Author;
}

// 일반 목록 조회 응답
export interface LPListResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    data: LP[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

// 태그 필터링 응답
export interface LPTagResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    data: LP[];
    nextCursor: number;
    hasNext: boolean;
  };
}

// 단일 LP 조회 응답
export interface LPDetailResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: LP;
}

export type SortOrder = 'asc' | 'desc';