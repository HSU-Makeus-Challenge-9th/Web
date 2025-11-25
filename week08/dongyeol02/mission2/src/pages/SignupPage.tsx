import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import {
  type SignupForm,
  emailStepSchema,
  passwordStepSchema,
  nicknameStepSchema,
  signupSchema,
} from "../schema/SignupSchema";
import { signup } from "../api/authApi";

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<SignupForm>>({});
  const [, setIsSubmitting] = useState(false); // 추가

  // 비밀번호 가시성 상태 추가
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 1단계: 이메일
  const emailForm = useForm({
    resolver: zodResolver(emailStepSchema),
    mode: "onChange",
  });

  // 2단계: 비밀번호, 비밀번호 확인
  const passwordForm = useForm({
    resolver: zodResolver(passwordStepSchema),
    mode: "onChange",
  });

  const passwordValue = passwordForm.watch("password");
  const confirmPasswordValue = passwordForm.watch("confirmPassword");

  useEffect(() => {
    passwordForm.trigger();
  }, [passwordValue, confirmPasswordValue, passwordForm]);

  // 3단계: 닉네임
  const nicknameForm = useForm({
    resolver: zodResolver(nicknameStepSchema),
    mode: "onChange",
  });

  const handleBackClick = () => {
    if (step > 1) setStep(step - 1);
    else {
      const hasPreviousState = location.key !== "default";
      if (hasPreviousState) navigate(-1);
      else navigate("/");
    }
  };

  // 비밀번호 토글 함수들
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // 단계별 submit 핸들러
  const handleEmailSubmit = (data: { email: string }) => {
    setFormData((prev) => ({ ...prev, email: data.email }));
    setStep(2);
  };

  const handlePasswordSubmit = (data: {
    password: string;
    confirmPassword: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }));
    setStep(3);
  };

  const handleNicknameSubmit = async (data: { nickname: string }) => {
    const fullData: SignupForm = {
      ...formData,
      nickname: data.nickname,
    } as SignupForm;

    // 최종 통합 데이터로 전체 유효성 검사
    const result = signupSchema.safeParse(fullData);

    if (!result.success) {
      console.error("유효성 검사 실패:", result.error);
      return;
    }

    setIsSubmitting(true); // 로딩 시작

    try {
      // API 호출
      const response = await signup({
        name: result.data.nickname, // nickname을 name으로 매핑
        email: result.data.email,
        password: result.data.password,
      });

      console.log("회원가입 성공!", response);

      // 성공 시 메인으로
      navigate("/", {
        state: {
          email: result.data.email,
          name: result.data.nickname,
        },
      });
    } catch (error: unknown) {
      console.error("회원가입 실패:", error);

      let errorMessage = "회원가입에 실패했습니다.";

      // axios 에러인지 확인
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { status?: number; data?: { message?: string } };
        };

        if (axiosError.response?.status === 400) {
          errorMessage = "입력 정보를 확인해주세요.";
        } else if (axiosError.response?.status === 409) {
          errorMessage = "이미 존재하는 이메일입니다.";
        } else if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        }
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-screen p-5 bg-black text-white">
      <div className="h-15 w-120 flex items-center justify-center relative px-4">
        <button className="absolute left-10 text-2xl" onClick={handleBackClick}>
          &lt;
        </button>
        <div className="text-2xl">회원가입</div>
      </div>
      <button className="border-2 rounded-xl h-15 w-120">구글 로그인</button>
      <div className="relative flex items-center w-120">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      {/* 1단계: 이메일 */}
      {step === 1 && (
        <form
          onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
          className="flex flex-col gap-3 w-120"
        >
          <input
            className="h-15 border-2 rounded-xl p-2 bg-black text-white"
            type="email"
            placeholder="이메일을 입력해주세요"
            {...emailForm.register("email")}
          />
          {emailForm.formState.errors.email &&
            emailForm.formState.touchedFields.email && (
              <p className="text-sm text-red-500">
                {emailForm.formState.errors.email.message}
              </p>
            )}
          <button
            className={`h-15 rounded-xl p-2 mt-1 ${
              emailForm.formState.isValid ? "bg-pink-500" : "bg-gray-500"
            }`}
            type="submit"
            disabled={!emailForm.formState.isValid}
          >
            다음
          </button>
        </form>
      )}

      {/* 2단계: 비밀번호/비밀번호 확인 */}
      {step === 2 && (
        <form
          onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
          className="flex flex-col gap-3 w-120"
        >
          <div className="p-3">
            <span className="text-white">이메일: </span>
            <span className="text-white">{formData.email}</span>
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="relative">
            <input
              className="h-15 border-2 rounded-xl p-2 pr-12 bg-black text-white w-full"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              {...passwordForm.register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {passwordForm.formState.errors.password &&
            passwordForm.formState.touchedFields.password && (
              <p className="text-sm text-red-500">
                {passwordForm.formState.errors.password.message}
              </p>
            )}

          {/* 비밀번호 확인 입력 필드 */}
          <div className="relative">
            <input
              className="h-15 border-2 rounded-xl p-2 pr-12 bg-black text-white w-full"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="비밀번호 확인"
              {...passwordForm.register("confirmPassword")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {passwordForm.formState.errors.confirmPassword &&
            passwordForm.formState.touchedFields.confirmPassword && (
              <p className="text-sm text-red-500">
                {passwordForm.formState.errors.confirmPassword.message}
              </p>
            )}

          <button
            className={`h-15 rounded-xl p-2 mt-1 ${
              passwordForm.formState.isValid ? "bg-pink-500" : "bg-gray-500"
            }`}
            type="submit"
            disabled={!passwordForm.formState.isValid}
          >
            다음
          </button>
        </form>
      )}

      {/* 3단계: 닉네임 입력 + 프로필 UI */}
      {step === 3 && (
        <form
          onSubmit={nicknameForm.handleSubmit(handleNicknameSubmit)}
          className="flex flex-col items-center gap-6 w-120"
        >
          {/* 프로필 설정 섹션 */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-lg text-white">프로필 설정</div>

            {/* 이메일 기반 동적 아바타 */}
            <div
              className={`w-24 h-24 rounded-full bg-pink-500 flex items-center justify-center shadow-lg`}
            >
              <div className="text-white text-2xl font-bold">
                {formData.email ? formData.email.charAt(0).toUpperCase() : "👤"}
              </div>
            </div>

            <div className="text-gray-400 text-sm text-center max-w-xs">
              {formData.email
                ? `${formData.email} 계정으로 가입됩니다`
                : "기본 프로필이 설정됩니다"}
            </div>
          </div>

          {/* 닉네임 입력 */}
          <input
            className="h-15 border-2 rounded-xl p-2 bg-black text-white w-full"
            type="text"
            placeholder="닉네임을 입력해주세요"
            {...nicknameForm.register("nickname")}
          />
          {nicknameForm.formState.errors.nickname &&
            nicknameForm.formState.touchedFields.nickname && (
              <p className="text-sm text-red-500">
                {nicknameForm.formState.errors.nickname.message}
              </p>
            )}

          <button
            className={`h-15 rounded-xl p-2 mt-1 w-full ${
              nicknameForm.formState.isValid ? "bg-pink-500" : "bg-gray-500"
            }`}
            type="submit"
            disabled={!nicknameForm.formState.isValid}
          >
            회원가입
          </button>
        </form>
      )}
    </div>
  );
};

export default SignupPage;
