import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import { useFormContext } from "react-hook-form";
import type { FormFields } from "./SignupPage";

interface SignupPageEmailProps {
  onNext: () => void;
}

const SignupPageEmail = ({ onNext }: SignupPageEmailProps) => {
  const {
    register,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext<FormFields>();

  const emailValue = watch("email") ?? "";

  const handleNext = async () => {
    const isValid = await trigger("email");
    if (isValid) {
      onNext();
    }
  };

  const isDisabled = !emailValue.trim() || Boolean(errors.email);

  return (
    <div className="w-full">
      <GoogleLoginButton />

      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-600" />
        <span className="px-3 text-gray-400 text-sm">OR</span>
        <div className="flex-1 border-t border-gray-600" />
      </div>

      <div className="mb-6">
        <input
          {...register("email")}
          type="email"
          inputMode="email"
          placeholder="이메일을 입력해주세요!"
          className={`w-full px-4 py-3 bg-transparent border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 ${
            errors.email
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          }`}
          autoComplete="email"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-500 text-center">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={isDisabled}
        className={`w-full py-3 rounded-md font-medium transition-colors ${
          isDisabled
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-pink-500 text-white hover:bg-pink-600 cursor-pointer"
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default SignupPageEmail;
