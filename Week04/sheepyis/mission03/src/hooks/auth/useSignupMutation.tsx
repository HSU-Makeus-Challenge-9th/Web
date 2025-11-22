import { useAuthMutation } from "./useAuthMutation";

type SignupReq = { email: string; password: string; name: string };
type SignupRes = {
  data?: { accessToken?: string; refreshToken?: string; name?: string };
};

export const useSignupMutation = () =>
  useAuthMutation<SignupReq, SignupRes>({
    path: "/auth/signup",
    successMessage: "회원가입이 완료되었습니다.",
    navigateTo: "/",
  });
