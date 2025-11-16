const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
  };
}

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
}

interface SignUpResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

interface SignOutResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: null;
}

export const authAPI = {
  signUp: async (userData: SignUpRequest): Promise<SignUpResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "회원가입에 실패했습니다.");
      }

      return response.json();
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        throw new Error(
          "서버에 연결할 수 없습니다. API 서버가 실행 중인지 확인해주세요."
        );
      }
      throw err;
    }
  },

  signIn: async (credentials: SignInRequest): Promise<SignInResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/v1/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "로그인에 실패했습니다.");
      }

      return response.json();
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        throw new Error(
          "서버에 연결할 수 없습니다. API 서버가 실행 중인지 확인해주세요."
        );
      }
      throw err;
    }
  },

  signOut: async (): Promise<SignOutResponse> => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`${API_BASE_URL}/v1/auth/signout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "로그아웃에 실패했습니다.");
      }

      return response.json();
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        throw new Error(
          "서버에 연결할 수 없습니다. API 서버가 실행 중인지 확인해주세요."
        );
      }
      throw err;
    }
  },
};

export type { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse, SignOutResponse };

