export { authAPI } from "./signin";
export { lpAPI } from "./lp";

export type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  SignOutResponse,
} from "./signin";

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
} from "./lp";
