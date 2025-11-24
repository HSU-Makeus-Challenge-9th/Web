import axios from "axios";
import type { AuthResponse, SigninRequest, SignupRequest } from "../types/auth";
import axiosInstance from "./axiosInstance";

export const API_BASE_URL = "http://localhost:8000";

export const Api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// 회원가입
export const signup = async (
  signupData: SignupRequest
): Promise<AuthResponse> => {
  const response = await Api.post("/v1/auth/signup", signupData);
  return response.data;
};

// 로그인
export const signin = async (
  signinData: SigninRequest
): Promise<AuthResponse> => {
  const response = await Api.post("/v1/auth/signin", signinData);
  return response.data;
};
//로그 아웃
export const signout = async () => {
  const response = await axiosInstance.post("/v1/auth/signout", null);
  console.log("로그아웃 시도");
  return response;
};
