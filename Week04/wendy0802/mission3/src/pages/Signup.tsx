import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useSignup, type SignupFormData } from "../hooks/useSignup";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [savedEmail, setSavedEmail] = useLocalStorage("signupEmail", "");
  const [nickname, setNickname] = useLocalStorage("signupNickname", "");

  const {
    emailRegister,
    passwordRegister,
    passwordConfirmRegister,
    handleSubmit,
    errors,
    isValid,
    watch,
  } = useSignup();

  const email = watch("email");

  const handleGoBack = () => {
    if (step === 2) setStep(1);
    else navigate(-1);
  };

  const handleNextStep = () => {
    if (email && !errors.email) {
      setSavedEmail(email);
      setStep(2);
    }
  };

  const handleStep2Submit = (data: SignupFormData) => {
    setStep(3);
  };

  const onSubmit = (data: SignupFormData) => {
    console.log("회원가입 데이터:", data);
    navigate("/");
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full flex items-center justify-center p-4">
      <button
        onClick={handleGoBack}
        className="absolute top-8 left-8 text-blue-500 text-2xl hover:text-gray-300 transition-colors"
      >
        ←
      </button>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-gray-600 text-center mb-8">
          SIGN UP
        </h1>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 bg-white hover:bg-gray-50 transition-colors mb-6"
        >
          <img
            src="../../src/assets/google.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">구글 로그인</span>
        </button>
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNextStep();
            }}
          >
            <div className="mb-4">
              <input
                type="email"
                placeholder="이메일을 입력해주세요!"
                {...emailRegister}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!email || !!errors.email}
              className={`w-full py-3 rounded-xl font-medium shadow-lg transition-colors
                ${
                  email && !errors.email
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              다음
            </button>
          </form>
        )}

        {step === 2 && (
          <>
            <div className="mb-6 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">이메일</p>
              <p className="text-gray-800 font-medium">{savedEmail}</p>
            </div>

            <form onSubmit={handleSubmit(handleStep2Submit)}>
              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요!"
                  {...passwordRegister}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mb-6 relative">
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="비밀번호를 다시 한 번 입력해주세요!"
                  {...passwordConfirmRegister}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPasswordConfirm ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>

                {errors.passwordConfirm && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.passwordConfirm.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className={`w-full py-3 rounded-xl font-medium shadow-lg transition-colors
                  ${
                    isValid
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                다음
              </button>
            </form>
          </>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4" />

              <p className="text-gray-600 text-sm mb-2">
                프로필 이미지는 추후 업로드 가능
              </p>

              <input
                type="text"
                placeholder="닉네임을 입력해주세요!"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={!nickname.trim()}
              className={`w-full py-3 rounded-xl font-medium shadow-lg transition-colors
        ${
          nickname.trim()
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
            >
              회원가입 완료
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
