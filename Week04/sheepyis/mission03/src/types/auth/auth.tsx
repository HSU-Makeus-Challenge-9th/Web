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
