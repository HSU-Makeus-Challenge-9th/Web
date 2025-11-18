export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

// lp 목록 응답시, 공통 타입
export type CursorBasedResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type PAGINATION_ORDER = "asc" | "desc";

// lp 목록 요청시, 파라미터 공통 타입
export type PagenationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PAGINATION_ORDER;
};
