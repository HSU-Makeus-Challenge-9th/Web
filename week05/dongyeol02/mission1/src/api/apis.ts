import type { myRespopnse } from "../types/my";
import { Api } from "./authApi";

//내 정보 조회

export const getMe = async (token: string): Promise<myRespopnse> => {
  const response = await Api.get("/v1/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
