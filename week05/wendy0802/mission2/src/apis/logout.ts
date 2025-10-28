import axiosInstance from "../config/axiosConfig";

export const signOutUser = async () => {
  try {
    const response = await axiosInstance.post("/v1/auth/signout");
    return response.data;
  } catch (error) {
    console.error("로그아웃 API 호출 실패:", error);
    throw error;
  }
};
