import { useFormContext } from "react-hook-form";
import type { FormFields } from "./SignupPage";

interface SignupPageNameProps {
  onBack: () => void;
  isSubmitting: boolean;
}

const SignupPageName = ({ onBack, isSubmitting }: SignupPageNameProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormFields>();

  const emailValue = watch("email");
  const nameValue = watch("name") ?? "";

  const isDisabled = !nameValue.trim() || Boolean(errors.name) || isSubmitting;

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

      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-700">
          <span className="text-gray-300 text-3xl" aria-hidden="true">
            👤
          </span>
        </div>
      </div>

      <div className="mb-6">
        <input
          {...register("name")}
          type="text"
          placeholder="닉네임을 입력해주세요!"
          className={`w-full px-4 py-3 bg-transparent border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 ${
            errors.name
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          }`}
          autoComplete="nickname"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-500 text-center">
            {errors.name.message}
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
          type="submit"
          disabled={isDisabled}
          className={`flex-1 py-3 rounded-md font-medium transition-colors ${
            isDisabled
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-pink-500 text-white hover:bg-pink-600 cursor-pointer"
          }`}
        >
          {isSubmitting ? "회원가입 중..." : "회원가입 완료"}
        </button>
      </div>
    </div>
  );
};

export default SignupPageName;
