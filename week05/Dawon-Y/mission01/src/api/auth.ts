import axios, { AxiosError } from 'axios';
import type { AuthResponse } from '../types/auth';

const API_URL = 'http://localhost:8000/v1';

interface ErrorResponse {
  message: string;
}

export const loginAPI = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, {
      email,
      password,
    });
    
    // response.data가 아니라 response.data.data에 토큰이 있음
    return {
      accessToken: response.data.data.accessToken,
      refreshToken: response.data.data.refreshToken,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw axiosError.response?.data || { message: '로그인에 실패했습니다.' };
  }
};

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