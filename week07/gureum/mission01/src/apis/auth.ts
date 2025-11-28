import axiosInstance from "./axios.ts";
import type { 
    RequestSigninDto, 
    ResponseSignupDto, 
    RequestSignupDto,
    ResponseSigninDto,
    ResponseMyInfoDto,
    RequestRefreshTokenDto,
    ResponseRefreshTokenDto,
} from "../types/auth.ts";
import type { UpdateUserRequest, UpdateUserResponse } from "../types/api.ts";


export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
    const {data} = await axiosInstance.post("v1/auth/signup", body);
    return data;
};
export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
    const {data} = await axiosInstance.post("v1/auth/signin", body);
    return data;
};
export const postLogout = async (): Promise<void> => {
    await axiosInstance.post("v1/auth/signout", {});
}
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me", {});
  return data;
};

// Google OAuth 로그인 URL 생성 (백엔드 엔드포인트 직접 사용)
export const getGoogleAuthUrl = (): string => {
  return `${import.meta.env.VITE_SERVER_API_URL}/v1/auth/google/login`;
};

export const postRefreshToken = async (body: RequestRefreshTokenDto): Promise<ResponseRefreshTokenDto> => {
  const { data } = await axiosInstance.post("/v1/auth/refresh", body);
  return data;
};

// 유저 정보 수정 API
export const updateUserInfo = async (body: UpdateUserRequest): Promise<UpdateUserResponse> => {
  const { data } = await axiosInstance.patch("/v1/users", body);
  return data;
};

// 회원 탈퇴 API
export const deleteUser = async (): Promise<void> => {
  await axiosInstance.delete("/v1/users");
};