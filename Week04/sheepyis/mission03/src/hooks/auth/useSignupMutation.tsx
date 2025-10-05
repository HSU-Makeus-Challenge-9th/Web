import { useMutation } from "@tanstack/react-query";
import { API } from "../../apis/axios";
import { useNavigation } from "../useNavigation";

type SignupRequest = {
  email: string;
  password: string;
  name: string;
};

const signupRequest = async (payload: SignupRequest) => {
  const res = await API.post("/auth/signup", payload);
  return res.data;
};

export const useSignupMutation = () => {
  const { handleMoveClick } = useNavigation();

  return useMutation({
    mutationFn: signupRequest,
    onSuccess: (data) => {
      alert("회원가입이 완료되었습니다.");
      console.log(data);
      handleMoveClick("/");
    },
    onError: (err) => {
      console.error("회원가입 실패:", err);
    },
  });
};
