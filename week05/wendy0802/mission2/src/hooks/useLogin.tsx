import { useForm } from "react-hook-form";
import { signInUser } from "../apis/login";
import type { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export interface LoginFormData {
  email: string;
  password: string;
}

export const useLoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: "onChange",
  });

  const emailRegister = register("email", {
    required: "이메일을 입력해주세요",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "올바른 이메일 형식을 입력해주세요.",
    },
  });

  const passwordRegister = register("password", {
    required: "비밀번호를 입력해주세요",
    minLength: {
      value: 6,
      message: "비밀번호는 최소 6자 이상이어야 합니다",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await signInUser(data);
      console.log("로그인 성공: ", response);

      // AuthContext를 통해 로그인 처리
      login(response.data.accessToken, response.data.refreshToken);
      localStorage.setItem("nickname", response.data.name);

      // 메인 페이지로 이동
      navigate("/");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.log(
        "로그인 실패: ",
        error.response?.data.message || error.message
      );
      alert(error.response?.data.message || "로그인에 실패했습니다.");
    }
  });

  return {
    emailRegister,
    passwordRegister,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
  } as const;
};
