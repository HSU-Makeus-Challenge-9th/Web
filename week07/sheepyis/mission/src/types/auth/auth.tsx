export type AuthPayload = {
  accessToken: string;
  refreshToken: string;
  name: string;
};

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  name: string | null;
};

export type LoginResponse = {
  status: boolean;
  message: string;
  statusCode: number;
  data?: {
    id?: number | null;
    name?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
  } | null;
};

// signup
export type SignupValues = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
};

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EditUserPayload {
  name: string;
  bio?: string;
  avatar?: string | null;
}
