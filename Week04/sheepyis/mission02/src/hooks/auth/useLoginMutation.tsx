import { useMutation } from "@tanstack/react-query";
import { API } from "../../apis/axios";
import { useNavigation } from "../useNavigation";
import type { LoginResponse } from "../../types/auth/auth";
import { useAuth } from "../../context/auth/authContext";

const loginRequest = async (data: { email: string; password: string }) => {
  const res = await API.post<LoginResponse>("/auth/signin", data);
  return res.data;
};

export const useLoginMutation = () => {
  const { handleMoveClick } = useNavigation();
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (res) => {
      const accessToken = res?.data?.accessToken ?? null;
      const refreshToken = res?.data?.refreshToken ?? null;
      const name = res?.data?.name ?? null;

      if (!accessToken || !refreshToken || !name) {
        console.warn("로그인 응답에 필요한 값이 없습니다:", res);
        return;
      }

      setAuth({ accessToken, refreshToken, name });
      handleMoveClick("/");
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });
};
