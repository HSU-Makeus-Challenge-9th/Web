import axios from "axios";
import type { AuthResponse, SigninRequest, SignupRequest } from "../types/auth";

const API_BASE_URL = "http://localhost:8000";

const authApi = axios.create({
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
  const response = await authApi.post("/v1/auth/signup", signupData);
  return response.data;
};

// 로그인
export const signin = async (
  signinData: SigninRequest
): Promise<AuthResponse> => {
  const response = await authApi.post("/v1/auth/signin", signinData);
  return response.data;
};
