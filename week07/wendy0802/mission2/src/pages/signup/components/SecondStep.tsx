import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import type { StepProps } from "../../../types/signup";

const Step2Password = ({
  formData,
  error,
  onNext,
  onUpdateField,
}: StepProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={onNext} className="space-y-4">
      <div className="flex items-center gap-2 mb-6 text-white">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
          />
        </svg>
        <span>{formData.email}</span>
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={(e) => onUpdateField("password", e.target.value)}
          className="w-full px-4 py-4 pr-12 bg-black border border-white rounded-lg focus:outline-none focus:border-pink-500 text-white"
          placeholder="비밀번호를 입력해주세요!"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={(e) => onUpdateField("confirmPassword", e.target.value)}
          className="w-full px-4 py-4 pr-12 bg-black border border-white rounded-lg focus:outline-none focus:border-pink-500 text-white"
          placeholder="비밀번호를 다시 한 번 입력해주세요!"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <button
        type="submit"
        className="w-full bg-gray-800 text-white py-4 rounded-lg font-semibold hover:bg-gray-700 transition"
      >
        다음
      </button>
    </form>
  );
};

export default Step2Password;