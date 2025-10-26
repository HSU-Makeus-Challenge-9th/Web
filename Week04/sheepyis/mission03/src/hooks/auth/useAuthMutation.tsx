import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { API } from "../../apis/axios";
import { useNavigation } from "../useNavigation";
import { useAuth } from "../../context/auth/authContext";

type RawAuthRes = {
  data?: { accessToken?: string; refreshToken?: string; name?: string };
};

type UseAuthMutationOptions<Req, Res = RawAuthRes> = {
  path: string;
  successMessage?: string;
  navigateTo?: string;
  transform?: (res: Res) => RawAuthRes;
};

export const useAuthMutation = <Req extends object, Res = RawAuthRes>(
  opts: UseAuthMutationOptions<Req, Res>
) => {
  const { handleMoveClick } = useNavigation();
  const { setAuth } = useAuth();

  const {
    path,
    successMessage,
    navigateTo = "/",
    transform = (r) => r as unknown as RawAuthRes,
  } = opts;

  return useMutation<Res, AxiosError, Req>({
    mutationFn: async (payload: Req) => {
      const res = await API.post<Res>(path, payload);
      return res.data;
    },
    onSuccess: (raw) => {
      const res = transform(raw);
      const accessToken = res?.data?.accessToken ?? null;
      const refreshToken = res?.data?.refreshToken ?? null;
      const name = res?.data?.name ?? null;

      if (accessToken && refreshToken && name) {
        setAuth({ accessToken, refreshToken, name });
      }

      if (successMessage) alert(successMessage);
      handleMoveClick(navigateTo);
    },
  });
};
