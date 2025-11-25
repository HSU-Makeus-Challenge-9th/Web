import { useMutation } from "@tanstack/react-query";
import { API } from "../../apis/axios";
import { useNavigation } from "../useNavigation";
import { useAuth } from "../../context/auth/AuthContext";

type SignupReq = { email: string; password: string; name: string };
type SignupRes = {
  data?: { accessToken?: string; refreshToken?: string; name?: string };
};

const signupRequest = async (payload: SignupReq) => {
  const res = await API.post<SignupRes>("/auth/signup", payload);
  return res.data;
};

export const useSignupMutation = () => {
  const { handleMoveClick } = useNavigation();
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: signupRequest,
    onSuccess: (res) => {
      const accessToken = res?.data?.accessToken ?? null;
      const refreshToken = res?.data?.refreshToken ?? null;
      const name = res?.data?.name ?? null;
      if (accessToken && refreshToken && name) {
        setAuth({ accessToken, refreshToken, name });
      }
      alert("회원가입이 완료되었습니다.");
      handleMoveClick("/");
    },
  });
};
