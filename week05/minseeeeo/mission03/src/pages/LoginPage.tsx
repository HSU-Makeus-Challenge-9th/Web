import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { Link, useNavigate } from "react-router-dom";
import type { RequestSigninDto } from "../types/auth";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import LoginButton from "../components/common/LoginButton";
import FormInput from "../components/common/FormInput";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  // 이미 로그인 된 상태라면, 홈으로 navigate
  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  const { values, errors, touched, getInputProps, resetForm } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    if (await login(values as unknown as RequestSigninDto)) {
      navigate("/my");
    } else {
      resetForm();
    }
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 bg-black">
      <div className="flex flex-col gap-3">
        <div className="text-xl font-bold flex items-center justify-between relative py-5">
          <Link to="/" className="cursor-pointer text-white">
            &lt;
          </Link>
          <span className="absolute left-1/2 transform -translate-x-1/2 text-white">
            로그인
          </span>
        </div>

        {/* 구글 로그인 버튼 */}
        <GoogleLoginButton />

        {/* --- OR --- */}
        <div className="relative flex justify-center py-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative bg-black px-10 text-sm text-white z-10">
            OR
          </div>
        </div>

        {/* 이메일 입력 */}
        <FormInput
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요!"
          getInputProps={getInputProps}
          errors={errors}
          touched={touched}
        />

        {/* 비밀번호 입력 */}
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          getInputProps={getInputProps}
          errors={errors}
          touched={touched}
        />

        {/* 로그인 버튼 */}
        <LoginButton handleSubmit={handleSubmit} isDisabled={isDisabled} />
      </div>
    </div>
  );
};

export default LoginPage;
