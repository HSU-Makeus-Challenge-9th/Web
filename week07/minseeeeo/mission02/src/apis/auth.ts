import type {
  RequestSignupDto,
  ResponseSignupDto,
  RequestSigninDto,
  ResponseSigninDto,
  ResponseMyInfoDto,
} from "../types/auth";
import type { CommonResponse } from "../types/common";

import axiosInstance from "./axios";

// 회원가입
export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  try {
    const { data } = await axiosInstance.post("/v1/auth/signup", body);
    return data;
  } catch (error) {
    console.log("Signup failed:", error);
    throw error;
  }
};

// 로그인
export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);
  return data;
};

// 로그아웃
// (POST) /v1/auth/signout
export const postLogout = async (): Promise<CommonResponse<boolean>> => {
  const { data } = await axiosInstance.post("/v1/auth/signout", {});
  return data;
};

// 내 정보 조회
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me", {});
  return data;
};
