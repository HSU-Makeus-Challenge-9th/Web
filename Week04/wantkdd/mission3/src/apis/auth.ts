import { API } from './axios';
import type { SignUpRequestBody } from '../types/auth/signup';
import type { LoginData, LoginResponse } from '../types/auth/login';

// 회원가입 API
export const signUp = async (data: SignUpRequestBody) => {
  const response = await API.post('/auth/signup', data);
  return response.data;
};

// 로그인 API
export const signIn = async (data: LoginData): Promise<LoginResponse> => {
  const response = await API.post('/auth/signin', data);
  return response.data;
};
