import { useQuery } from "@tanstack/react-query";
import { API } from "../../apis/axios";
import type { UserResponse } from "../../types/auth/auth";

export const useUserQuery = () => {
  return useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await API.get("users/me");
      return res.data.data;
    },
  });
};
