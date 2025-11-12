import { API, PrivateAPI } from './axios';
import type { SignUpRequestBody, SignUpResponse } from '../types/auth/signup';
import type { LoginData, LoginResponse } from '../types/auth/login';

// 회원가입 API
export const signUp = async (data: SignUpRequestBody): Promise<SignUpResponse> => {
  const response = await API.post('/auth/signup', data);
  return response.data;
};

// 로그인 API
export const signIn = async (data: LoginData): Promise<LoginResponse> => {
  const response = await API.post('/auth/signin', data);
  return response.data;
};

// 로그아웃 API
export const signOut = async (): Promise<void> => {
  await PrivateAPI.post('/auth/signout');
};
