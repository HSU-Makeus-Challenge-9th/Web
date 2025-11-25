import axios, { AxiosError } from 'axios';
import axiosInstance from './axiosInstance';
import type { AuthResponse } from '../types/auth';

const API_URL = 'http://localhost:8000/v1';

interface ErrorResponse {
  message: string;
}

// 로그인은 토큰이 필요 없으므로 일반 axios 사용
export const loginAPI = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, {
      email,
      password,
    });
    
    return {
      accessToken: response.data.data.accessToken,
      refreshToken: response.data.data.refreshToken,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw axiosError.response?.data || { message: '로그인에 실패했습니다.' };
  }
};

// 회원가입도 토큰이 필요 없으므로 일반 axios 사용
export const signupAPI = async (
  email: string,
  password: string,
  passwordCheck: string,
  name: string 
): Promise<void> => {
  try {
    await axios.post(`${API_URL}/auth/signup`, {
      name, 
      email,
      password,
      passwordCheck,
    });
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw axiosError.response?.data || { message: '회원가입에 실패했습니다.' };
  }
};

// 토큰이 필요한 API는 axiosInstance 사용
export const getMyInfo = async () => {
  const response = await axiosInstance.get('/users/me');
  return response.data;
};

// 로그아웃
export const logoutAPI = async () => {
  const response = await axiosInstance.post('/auth/signout');
  return response.data;
};

// 회원 탈퇴
export const deleteAccountAPI = async () => {
  const response = await axiosInstance.delete('/users');
  return response.data;
};

// 프로필 수정
interface UpdateProfileData {
  name?: string;
  bio?: string;
  avatar?: string;
}

export const updateProfileAPI = async (data: UpdateProfileData) => {
  const response = await axiosInstance.patch('/users', data);
  return response.data;
};