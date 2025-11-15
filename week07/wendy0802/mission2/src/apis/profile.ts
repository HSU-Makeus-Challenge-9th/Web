const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfilePayload {
  name: string;
  bio?: string | null;
  avatar?: string | null;
}

interface BasicResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: null | unknown;
}

interface ProfileResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: UserProfile;
}

const requireToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }
  return accessToken;
};

export const getProfile = async (): Promise<UserProfile> => {
  const accessToken = requireToken();

  const response = await fetch(`${API_BASE_URL}/v1/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "프로필 정보를 불러오지 못했습니다.");
  }

  const result: ProfileResponse = await response.json();
  return result.data;
};

export const updateProfile = async (
  payload: UpdateProfilePayload
): Promise<UserProfile> => {
  const accessToken = requireToken();

  const response = await fetch(`${API_BASE_URL}/v1/users`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "프로필 수정에 실패했습니다.");
  }

  const result: ProfileResponse = await response.json();
  return result.data;
};

export const deleteAccount = async (): Promise<BasicResponse> => {
  const accessToken = requireToken();

  const response = await fetch(`${API_BASE_URL}/v1/users`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "회원 탈퇴에 실패했습니다.");
  }

  return response.json();
};
