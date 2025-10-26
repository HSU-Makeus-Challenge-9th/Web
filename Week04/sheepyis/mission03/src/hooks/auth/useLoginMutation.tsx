import { useAuthMutation } from "./useAuthMutation";
type LoginReq = { email: string; password: string };
type LoginRes = {
  data?: { accessToken?: string; refreshToken?: string; name?: string };
};

export const useLoginMutation = () =>
  useAuthMutation<LoginReq, LoginRes>({
    path: "/auth/signin",
    navigateTo: "/",
  });
