import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { FormFields } from "./SignupPage";

interface SignupPagePasswordProps {
  onBack: () => void;
  onNext: () => void;
}

const SignupPagePassword = ({ onBack, onNext }: SignupPagePasswordProps) => {
  const {
    register,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext<FormFields>();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordCheckVisible, setIsPasswordCheckVisible] = useState(false);

  const emailValue = watch("email");
  const passwordValue = watch("password") ?? "";
  const passwordCheckValue = watch("passwordCheck") ?? "";

  const handleNext = async () => {
    const isValid = await trigger(["password", "passwordCheck"]);
    if (isValid) {
      onNext();
    }
  };

  const isDisabled =
    !passwordValue.trim() ||
    !passwordCheckValue.trim() ||
    Boolean(errors.password) ||
    Boolean(errors.passwordCheck);

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center space-x-2 text-gray-300 text-sm">
          <span role="img" aria-label="registered email">
            📧
          </span>
          <span>{emailValue}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative">
          <input
            {...register("password")}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요!"
            className={`w-full px-4 py-3 pr-12 bg-transparent border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 ${
              errors.password
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            }`}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            aria-label={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 표시"}
          >
            {isPasswordVisible ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.password && (
          <p className="mt-2 text-sm text-red-500 text-center">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            {...register("passwordCheck")}
            type={isPasswordCheckVisible ? "text" : "password"}
            placeholder="비밀번호를 다시 한 번 입력해주세요!"
            className={`w-full px-4 py-3 pr-12 bg-transparent border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 ${
              errors.passwordCheck
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            }`}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setIsPasswordCheckVisible((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            aria-label={isPasswordCheckVisible ? "비밀번호 숨기기" : "비밀번호 표시"}
          >
            {isPasswordCheckVisible ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.passwordCheck && (
          <p className="mt-2 text-sm text-red-500 text-center">
            {errors.passwordCheck.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 rounded-md border border-gray-600 text-gray-200 hover:bg-gray-800 transition-colors"
        >
          이전
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={isDisabled}
          className={`flex-1 py-3 rounded-md font-medium transition-colors ${
            isDisabled
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-pink-500 text-white hover:bg-pink-600 cursor-pointer"
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default SignupPagePassword;
