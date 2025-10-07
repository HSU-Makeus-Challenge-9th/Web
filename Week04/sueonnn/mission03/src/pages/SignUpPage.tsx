import React, { useState, useMemo } from "react";
import { useForm, useWatch, FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  signUpSchema,
  SignUpFormFields,
  stepFields,
  RequestSignUpDTO,
} from "../schemas/signUpSchema";

// 타입 정의: 단계별 필드 타입 (useForm의 FieldPath 타입으로 지정)
type StepField = FieldPath<SignUpFormFields>;

// 최소 UI: 아이콘 (실제 아이콘 라이브러리 대신 텍스트로 대체)
const EyeOpen = () => <span>👁️</span>;
const EyeClosed = () => <span>👁️‍🗨️</span>;
const PlaceholderImage = () => (
  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xs">
    사진
  </div>
);

//이메일 입력 단계 컴포넌트
const StepOne: React.FC<{
  register: any;
  errors: any;
  isValid: boolean;
  onNext: () => void;
}> = ({ register, errors, isValid, onNext }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">1. 이메일 입력</h2>
      <div>
        <input
          type="email"
          placeholder="이메일 주소"
          className={`w-full p-3 border rounded-lg transition ${errors.email ? "border-red-500" : "border-gray-300"}`}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* '다음' 버튼 활성화 로직 */}
      <button
        type="button"
        onClick={onNext}
        disabled={!isValid || !!errors.email}
        className={`w-full py-3 font-semibold rounded-lg transition ${
          !isValid || !!errors.email
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        다음
      </button>
    </div>
  );
};

//비밀번호 설정 단계 컴포넌트
const StepTwo: React.FC<{
  register: any;
  errors: any;
  isValid: boolean;
  onNext: () => void;
  emailValue: string;
}> = ({ register, errors, isValid, onNext, emailValue }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-600 mb-4 p-2 border-b">
        <span className="font-medium">계정:</span> {emailValue}
      </div>

      <h2 className="text-xl font-bold">2. 비밀번호 설정</h2>

      {/* 비밀번호 입력 */}
      <div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호 (최소 6자)"
            className={`w-full p-3 border rounded-lg transition ${errors.password ? "border-red-500" : "border-gray-300"}`}
            {...register("password")}
          />
          {/* 비밀번호 가시성 토글 버튼 */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOpen /> : <EyeClosed />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* 비밀번호 재확인 */}
      <div>
        <input
          type="password"
          placeholder="비밀번호 재확인"
          className={`w-full p-3 border rounded-lg transition ${errors.passwordCheck ? "border-red-500" : "border-gray-300"}`}
          {...register("passwordCheck")}
        />
        {/* 비밀번호 일치 에러 메시지 */}
        {errors.passwordCheck && (
          <p className="text-red-500 text-sm mt-1">
            {errors.passwordCheck.message}
          </p>
        )}
      </div>

      {/* '다음' 버튼 활성화 로직 */}
      <button
        type="button"
        onClick={onNext}
        disabled={!isValid || !!errors.password || !!errors.passwordCheck}
        className={`w-full py-3 font-semibold rounded-lg transition ${
          !isValid || !!errors.password || !!errors.passwordCheck
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        다음
      </button>
    </div>
  );
};

//닉네임 및 완료 단계 컴포넌트
const StepThree: React.FC<{
  register: any;
  errors: any;
  isSubmitting: boolean;
  emailValue: string;
}> = ({ register, errors, isSubmitting, emailValue }) => {
  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-600 mb-4 p-2 border-b">
        <span className="font-medium">계정:</span> {emailValue}
      </div>

      <h2 className="text-xl font-bold">3. 닉네임 및 완료</h2>

      {/* 프로필 이미지 UI (선택 구현) */}
      <div className="flex items-center space-x-4">
        <PlaceholderImage />
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          프로필 사진 선택 (UI)
        </button>
      </div>

      {/* 닉네임 입력 */}
      <div>
        <input
          type="text"
          placeholder="닉네임 (2자 이상)"
          className={`w-full p-3 border rounded-lg transition ${errors.nickname ? "border-red-500" : "border-gray-300"}`}
          {...register("nickname")}
        />
        {errors.nickname && (
          <p className="text-red-500 text-sm mt-1">{errors.nickname.message}</p>
        )}
      </div>

      {/* 회원가입 완료 버튼 */}
      <button
        type="submit" // 폼 제출
        disabled={isSubmitting || !!errors.nickname}
        className={`w-full py-3 font-bold rounded-lg transition ${
          isSubmitting || !!errors.nickname
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        {isSubmitting ? "처리 중..." : "회원가입 완료"}
      </button>
    </div>
  );
};

//메인 SignUpPage 컴포넌트 (폼 관리)
function SignUpPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: email, 1: password, 2: nickname

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger, // 수동 유효성 검사 트리거 함수
    control,
  } = useForm<SignUpFormFields>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "", passwordCheck: "", nickname: "" },
  });

  // 이메일 값 추적 (상단 표시에 사용)
  const emailValue = useWatch({ control, name: "email" });

  // 현재 단계 필드에 대한 유효성 검사 수행
  const handleNext = async () => {
    // 현재 단계에 해당하는 필드만 검사
    const currentFields = stepFields[step] as StepField[];
    const isValid = await trigger(currentFields, { shouldFocus: true });

    if (isValid) {
      setStep((prev) => prev + 1); // 다음 단계로 전환
    }
  };

  const onSubmit = async (data: SignUpFormFields) => {
    const { passwordCheck, ...requestData } = data; // passwordCheck 제거

    try {
      // ⚠️ 실제 API 호출 로직
      // const response = await postSignUp(requestData);
      console.log("최종 회원가입 데이터:", requestData);

      alert("회원가입 성공! 홈 화면으로 이동합니다.");
      navigate("/"); // 회원가입 후 홈 화면으로 이동
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패: 서버 오류");
    }
  };

  // 폼 렌더링
  const renderStep = () => {
    const currentFields = stepFields[step] as StepField[];

    // 현재 단계 필드가 모두 유효한지 확인 (다음 버튼 활성화용)
    const isStepValid = currentFields.every((field) => !errors[field]);

    switch (step) {
      case 0:
        return (
          <StepOne
            register={register}
            errors={errors}
            isValid={isStepValid}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <StepTwo
            register={register}
            errors={errors}
            isValid={isStepValid}
            onNext={handleNext}
            emailValue={emailValue}
          />
        );
      case 2:
        return (
          <StepThree
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            emailValue={emailValue}
          />
        );
      default:
        return <div>잘못된 접근입니다.</div>;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-[450px] p-8 bg-white shadow-xl rounded-xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          회원가입
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>{renderStep()}</form>

        {/* 이전 단계 버튼 (선택 사항) */}
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((prev) => prev - 1)}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700"
          >
            &larr; 이전 단계
          </button>
        )}
      </div>
    </div>
  );
}

export default SignUpPage;
