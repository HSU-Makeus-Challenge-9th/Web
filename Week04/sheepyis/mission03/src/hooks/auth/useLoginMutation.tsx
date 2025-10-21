import { useMutation } from "@tanstack/react-query";
import { API } from "../../apis/axios";
import { useNavigation } from "../useNavigation";
import { useAuth } from "../../context/auth/authContext";

type LoginReq = { email: string; password: string };
type LoginRes = {
  data?: { accessToken?: string; refreshToken?: string; name?: string };
};

const loginRequest = async (payload: LoginReq) => {
  const res = await API.post<LoginRes>("/auth/signin", payload);
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
      if (accessToken && refreshToken && name) {
        setAuth({ accessToken, refreshToken, name });
      }
      handleMoveClick("/");
    },
  });
};
