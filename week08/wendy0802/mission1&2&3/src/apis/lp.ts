const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface CreateLPRequest {
  title: string;
  content: string;
  thumbnail?: string;
  tags?: string[];
  published: boolean;
}

export interface LPResponse {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

export const createLP = async (data: CreateLPRequest): Promise<LPResponse> => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await fetch(`${API_BASE_URL}/v1/lps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let message = "LP 생성에 실패했습니다.";
    try {
      const errorBody = await response.json();
      if (typeof errorBody?.message === "string") {
        message = errorBody.message;
      }
    } catch {
      // ignore json parse errors
    }
    throw new Error(message);
  }

  const result = await response.json();
  return result.data;
};

interface Tag {
  id: number;
  name: string;
}

interface Like {
  id: number;
  userId: number;
  lpId: number;
}

interface LP {
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
}

interface GetLPsResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    data: LP[];
    nextCursor: number | null;
    hasNext: boolean;
  };
}

interface GetLPsParams {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: "asc" | "desc";
}

interface LPDetail {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  likes: Array<{ id: number; userId: number; lpId: number }>;
  author: { id: number; name: string; avatar: string | null };
  createdAt: string;
}

interface GetLPDetailResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: LPDetail;
}

interface Comment {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface GetCommentsResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    data: Comment[];
    nextCursor: number | null;
    hasNext: boolean;
  };
}

interface GetCommentsParams {
  lpId: number;
  cursor?: number;
  limit?: number;
  order?: "asc" | "desc";
}

export const lpAPI = {
  updateLP: async (
    lpId: number,
    payload: Partial<CreateLPRequest>
  ): Promise<GetLPDetailResponse> => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("로그인이 필요합니다.");
    }
    const response = await fetch(`${API_BASE_URL}/v1/lps/${lpId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errBody = await response.json().catch(() => null);
      throw new Error(errBody?.message ?? "LP 수정에 실패했습니다.");
    }

    return response.json();
  },
  deleteLP: async (lpId: number): Promise<{ status: boolean }> => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("로그인이 필요합니다.");
    }
    const response = await fetch(`${API_BASE_URL}/v1/lps/${lpId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      const errBody = await response.json().catch(() => null);
      throw new Error(errBody?.message ?? "LP 삭제에 실패했습니다.");
    }
    return response.json();
  },
  getLPs: async (params?: GetLPsParams): Promise<GetLPsResponse> => {
    try {
      const queryParams = new URLSearchParams();

      if (params?.cursor !== undefined && params.cursor !== null) {
        queryParams.append("cursor", params.cursor.toString());
      }
      if (params?.limit !== undefined) {
        queryParams.append("limit", params.limit.toString());
      }
      if (params?.search) {
        queryParams.append("search", params.search);
      }
      if (params?.order) {
        queryParams.append("order", params.order);
      }

      const url = `${API_BASE_URL}/v1/lps${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "LP 목록 조회에 실패했습니다.");
      }

      return response.json();
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        throw new Error(
          "서버에 연결할 수 없습니다. API 서버가 실행 중인지 확인해주세요."
        );
      }
      throw err;
    }
  },

  getLPDetail: async (lpId: number): Promise<GetLPDetailResponse> => {
    try {
      const url = `${API_BASE_URL}/v1/lps/${lpId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "LP 상세 조회에 실패했습니다.");
      }

      const result: GetLPDetailResponse = await response.json();
      return result;
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        throw new Error(
          "서버에 연결할 수 없습니다. API 서버가 실행 중인지 확인해주세요."
        );
      }
      throw err;
    }
  },

  getComments: async (
    params: GetCommentsParams
  ): Promise<GetCommentsResponse> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const queryParams = new URLSearchParams();

      if (params.cursor !== undefined && params.cursor !== null) {
        queryParams.append("cursor", params.cursor.toString());
      }
      if (params.limit !== undefined) {
        queryParams.append("limit", params.limit.toString());
      }
      if (params.order) {
        queryParams.append("order", params.order);
      }

      const url = `${API_BASE_URL}/v1/lps/${params.lpId}/comments${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "댓글 조회에 실패했습니다.");
      }

      return response.json();
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        throw new Error(
          "서버에 연결할 수 없습니다. API 서버가 실행 중인지 확인해주세요."
        );
      }
      throw err;
    }
  },
};

export type {
  LP,
  LPDetail,
  Comment,
  GetLPsResponse,
  GetLPsParams,
  GetLPDetailResponse,
  GetCommentsResponse,
  GetCommentsParams,
  Tag,
  Like,
};
