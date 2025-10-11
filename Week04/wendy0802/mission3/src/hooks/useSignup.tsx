import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../apis/signup";
import type { AxiosError } from "axios";
export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  bio?: string;
  avatar?: string;
}

export const useSignup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    mode: "onChange",
  });

  const nameRegister = register("name", {
    required: "이름을 입력해주세요",
    minLength: {
      value: 2,
      message: "이름은 최소 2자 이상이어야 합니다",
    },
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

  const passwordConfirmRegister = register("passwordConfirm", {
    required: "비밀번호 확인을 입력해주세요",
    validate: (value) =>
      value === watch("password") || "비밀번호가 일치하지 않습니다",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("회원가입 시도 데이터:", data);
      const { name, email, password, bio, avatar } = data;
      const response = await signUpUser({ name, email, password, bio, avatar });
      console.log("회원가입 성공", response);
      alert("회원가입이 완료되었습니다!");
      navigate("/");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error("회원가입 실패 전체 에러:", err);
      console.error("에러 응답:", error.response);
      console.error("에러 상태:", error.response?.status);
      console.error("에러 메시지:", error.response?.data);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "회원가입에 실패했습니다.";
      alert(`회원가입 실패: ${errorMessage}`);
    }
  });

  return {
    nameRegister,
    emailRegister,
    passwordRegister,
    passwordConfirmRegister,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
    watch,
  } as const;
};
