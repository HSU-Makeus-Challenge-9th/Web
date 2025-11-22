// --- 1. 공통 응답 구조 ---
// 모든 API 응답이 status, statusCode, message, data를 포함한다고 가정
export interface CommonResponse<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data: T; // 실제 데이터가 담기는 부분 (제네릭 T)
}

// --- 2. 요청 DTO (Request Data Transfer Object) ---

// 회원가입 요청 DTO
export interface RequestSignupDTO {
  name: string;
  email: string;
  password: string;
  bio?: string; // 선택적 필드
  avatar?: string; // 선택적 필드
}

// 로그인 요청 DTO
export interface RequestSigninDTO {
  email: string;
  password: string;
}

// --- 3. 응답 DTO (Response Data Transfer Object) ---

// 회원 정보 기본 구조 (로그인 성공 및 내 정보 조회 응답의 데이터 부분)
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

// 로그인 성공 응답 DTO (CommonResponse의 data 필드에 들어가는 실제 데이터)
export interface ResponseSigninDTO {
  accessToken: string;
  refreshToken: string;
  id: number;
  name: string;
}

// 내 정보 조회 응답 DTO (CommonResponse의 data 필드에 들어가는 실제 데이터)
// 서버의 응답에 따라 UserInfo 구조를 그대로 사용하거나 토큰이 없는 형태로 정의합니다.
export interface ResponseMyInfo extends UserInfo {
  // 필요하다면 추가 필드를 정의
}
