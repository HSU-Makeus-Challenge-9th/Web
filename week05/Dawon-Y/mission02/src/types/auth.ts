export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignupFormValues {
  email: string;
  password: string;
  passwordCheck: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfo {
  id: number;
  email: string;
  name: string;
}