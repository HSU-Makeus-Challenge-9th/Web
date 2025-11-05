import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import LoginButton from "../components/common/LoginButton";
import FormInput from "../components/common/FormInput";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import type { RequestSigninDto } from "../types/auth";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, accessToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 로그인 성공 후 원래 페이지로 복귀
  useEffect(() => {
    if (accessToken) {
      const from = location.state?.from || "/";
      console.log("✅ 로그인 완료, 이동할 페이지:", from);
      navigate(from, { replace: true });
    }
  }, [accessToken, navigate, location.state]);

  const { values, errors, touched, getInputProps, resetForm } = useForm<UserSigninInformation>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const hasErrors = Object.values(errors ?? {}).some((error) => Boolean(error));
  const hasEmptyValues = Object.values(values).some((value) => value === "");
  const isDisabled = hasErrors || hasEmptyValues || isSubmitting;

  const handleLoginSubmit = async () => {
    if (isDisabled) return;

    setIsSubmitting(true);
    const loginCredentials: RequestSigninDto = {
      email: values.email,
      password: values.password,
    };

    try {
      console.log("🔐 로그인 시도 중...", { email: loginCredentials.email });
      const loginSuccess = await login(loginCredentials);
      
      if (loginSuccess) {
        console.log("✅ 로그인 성공");
        // useEffect에서 자동으로 리다이렉트됨
      } else {
        console.log("❌ 로그인 실패, 폼 초기화");
        resetForm();
      }
    } catch (error) {
      console.error("🚨 로그인 에러:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      <Navbar active="login" onToggleSidebar={() => {}} />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center mb-8 relative">
            <Link to="/" className="absolute left-0 text-white hover:text-gray-300" aria-label="홈으로 이동">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <h2 className="text-2xl font-semibold">로그인</h2>
          </div>

          <GoogleLoginButton />

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600" />
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-600" />
          </div>

          <FormInput
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요!"
            getInputProps={getInputProps}
            errors={errors}
            touched={touched}
          />

          <FormInput
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            getInputProps={getInputProps}
            errors={errors}
            touched={touched}
          />

          <LoginButton handleSubmit={handleLoginSubmit} isDisabled={isDisabled} isLoading={isSubmitting} />

          <div className="mt-6 text-center text-sm text-gray-400">
            아직 계정이 없으신가요?{' '}
            <Link to="/signup" className="text-pink-500 hover:text-pink-400 underline">
              회원가입하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
