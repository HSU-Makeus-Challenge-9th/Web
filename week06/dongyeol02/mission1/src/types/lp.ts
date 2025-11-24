// --- 1. 기본 아이템 타입 정의 (최상단) ---

/** 좋아요 정보 타입 */
interface Like {
  id: number;
  userId: number;
  lpId: number;
}

export interface LpTag {
  id: number;
  name: string;
}

/** 쿼리 매개변수 타입 (유지) */
export interface LpQueryParams {
  cursor: number;
  limit: number;
  order: "asc" | "desc";
}

// ----------------------------------------------------------------------
// --- 2. 목록 조회 관련 타입 ---

/** LP 아이템 타입 (목록의 개별 요소) */
export interface LpItem {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: LpTag[];
  likes: Like[]; // 일반 배열로 수정
}

/** LP 목록 API 응답의 Data 필드 */
export interface LpApiData {
  data: LpItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

/** LP 목록 API 전체 응답 구조 */
export interface LpApiFullResponse {
  status: boolean;
  message: string;
  statusCode: number;
  data: LpApiData;
}

// ----------------------------------------------------------------------
// --- 3. 상세 조회 관련 타입 ---

/** 작성자 정보 타입 */
export interface Author {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

/** LP 상세 정보 타입 (data 필드) */
export interface LpDetail {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
  tags: LpTag[];
  likes: Like[];
}

/** LP 상세 API 전체 응답 구조 */
export interface LpDetailFullResponse {
  status: boolean;
  message: string;
  statusCode: number;
  data: LpDetail;
}
