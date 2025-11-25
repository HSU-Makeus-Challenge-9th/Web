import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../apis/axios";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식을 입력해주세요."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await axios.post("/v1/auth/signin", data);
      return response.data.data;
    },
    onSuccess: (userData) => {
      localStorage.setItem("accessToken", userData.accessToken);
      sessionStorage.setItem("refreshToken", userData.refreshToken);
      localStorage.setItem("nickname", userData.name);
      window.dispatchEvent(new Event("storage"));
      console.log("로그인 성공:", userData);
      navigate("/");
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message?: string }>;
      console.error("로그인 실패:", error.response?.data || error.message);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    onSubmit,
  };
};
