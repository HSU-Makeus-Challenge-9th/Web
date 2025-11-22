import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { type LoginFormValues, loginSchema } from "../schema/LoginSchema";
import { signin } from "../api/authApi";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await signin({
        email: data.email,
        password: data.password,
      });

      if (response.status) {
        console.log("로그인 성공!", response.data);

        login(
          response.data.accessToken,
          response.data.refreshToken,
          response.data.name
        );

        // 대시보드 또는 메인 페이지로 이동
        navigate("/");
      }
    } catch (error: unknown) {
      console.error("로그인 실패:", error);

      let errorMessage = "로그인에 실패했습니다.";

      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          errorMessage =
            "서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.";
        } else if (error.response?.status === 401) {
          errorMessage = "이메일 또는 비밀번호가 잘못되었습니다.";
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-10 min-h-screen p-5 bg-black text-white"
    >
      <div className="h-15 w-120 flex items-center justify-center relative px-4">
        <button
          className="absolute left-10 text-2xl"
          type="button"
          onClick={handleBackClick}
        >
          &lt;
        </button>
        <div className="text-2xl">로그인</div>
      </div>

      <button className="border-2 rounded-xl h-15 w-120" type="button">
        구글 로그인
      </button>

      <div className="relative flex items-center w-120">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <div className="flex flex-col gap-3">
        <input
          className="h-15 w-120 border-2 rounded-xl p-2 bg-black text-white"
          type="email"
          placeholder="이메일을 입력해주세요"
          {...register("email")}
        />
        {errors.email && touchedFields.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <input
          className="h-15 w-120 border-2 rounded-xl p-2 bg-black text-white"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register("password")}
        />
        {errors.password && touchedFields.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        className={`h-15 w-120 rounded-xl p-2 ${
          isValid && !isSubmitting
            ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            : "bg-gray-500 cursor-not-allowed"
        } transition-colors`}
        type="submit"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
};

export default LoginPage;
