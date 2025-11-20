import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";
import type { RequestSigninDto } from "../../types/auth";
import { LOCAL_STORAGE_KEY } from "../../constants/key";

function usePostSignIn() {
  return useMutation({
    mutationFn: (body: RequestSigninDto) => postSignin(body),
    onSuccess: (data) => {
      console.log("로그인 성공:", data);
      // 토큰을 로컬스토리지에 저장
      localStorage.setItem(
        LOCAL_STORAGE_KEY.accessToken,
        JSON.stringify(data.data.accessToken)
      );
      localStorage.setItem(
        LOCAL_STORAGE_KEY.refreshToken,
        JSON.stringify(data.data.refreshToken)
      );
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });
}

export default usePostSignIn;
