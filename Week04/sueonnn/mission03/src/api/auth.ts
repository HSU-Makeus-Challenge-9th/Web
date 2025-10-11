import axiosInstance from "../axios";
import {
  CommonResponse,
  RequestSignupDTO,
  RequestSigninDTO,
  ResponseSigninDTO,
  ResponseMyInfo,
} from "../types/auth";

export const postSignup = async (
  body: RequestSignupDTO
): Promise<CommonResponse<unknown>> => {
  const { data } = await axiosInstance.post(`/v1/auth/signup`, body);
  return data;
};

export const postSignin = async (
  body: RequestSigninDTO
): Promise<CommonResponse<ResponseSigninDTO>> => {
  const { data } = await axiosInstance.post(`/v1/auth/signin`, body);
  return data;
};

export const getMyInfo = async (): Promise<CommonResponse<ResponseMyInfo>> => {
  const { data } = await axiosInstance.get(`/v1/users/me`);
  return data;
};
