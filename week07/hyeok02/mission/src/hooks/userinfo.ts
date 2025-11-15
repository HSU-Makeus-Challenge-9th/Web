import axios from "../apis/axios";

export const fetchCurrentUserInfo = async () => {
  try {
    const response = await axios.get("/v1/users/me");
    return response.data.data;
  } catch (error) {
    console.error("현재 유저 정보 조회 실패:", error);
    return null;
  }
};
