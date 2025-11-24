import type { myRespopnse } from "../types/my";
import axiosInstance from "./axiosInstance";

//내 정보 조회

export const getMe = async (token: string): Promise<myRespopnse> => {
  const response = await axiosInstance.get("/v1/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
