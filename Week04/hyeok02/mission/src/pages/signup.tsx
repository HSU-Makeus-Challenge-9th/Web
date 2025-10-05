import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useSignupForm } from "../hooks/usesignupform";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    emailValue,
    setEmailValue,
    registerEmail,
    handleEmailSubmit,
    emailErrors,
    isEmailValid,
    registerPassword,
    handlePasswordSubmit,
    pwErrors,
    isPasswordValid,
    registerNickname,
    onNicknameSubmit,
    nicknameErrors,
    isNicknameValid,
  } = useSignupForm();

  const onEmailSubmit = handleEmailSubmit((data) => {
    setEmailValue(data.email);
    setStep(2);
  });

  const onPasswordSubmit = handlePasswordSubmit(() => setStep(3));

  const goBack = () => {
    if (step === 1) navigate(-1);
    else setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-start justify-center pt-[150px] select-none">
      <form
        onSubmit={
          step === 1 ? onEmailSubmit : step === 2 ? onPasswordSubmit : onNicknameSubmit
        }
        className={`w-[450px] ${
          step === 3 ? "h-[343px]" : step === 1 ? "h-[313px]" : "h-[370px]"
        } rounded-tl-[10px] bg-black flex flex-col items-center relative select-none`}
      >
        <button
          type="button"
          onClick={goBack}
          className="absolute top-[0.5px] left-15 h-9.5 p-3 text-white hover:text-pink-400 flex items-center"
        >
          <span className="text-2xl font-bold">&lt;</span>
        </button>

        <h2 className="text-lg font-semibold mt-2 mb-4">회원가입</h2>

        {step === 1 && (
          <>
            <button
              type="button"
              className="w-[300px] border border-white py-2.5 rounded flex items-center justify-center gap-2 hover:bg-gray-800"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="google"
                className="w-5 h-5"
              />
              <span>구글 로그인</span>
            </button>

            <div className="flex items-center w-[300px] mt-4">
              <hr className="flex-grow border-gray-600" />
              <span className="mx-2 text-sm text-gray-400">OR</span>
              <hr className="flex-grow border-gray-600" />
            </div>

            <input
              type="text"
              placeholder="이메일을 입력해주세요!"
              className="w-[300px] py-2.5 px-3 mt-4 bg-black border border-white rounded text-white text-sm"
              {...registerEmail("email")}
            />
            <span className="text-red-500 text-xs w-[300px] mt-1">
              {emailErrors.email?.message || " "}
            </span>

            <button
              type="submit"
              disabled={!isEmailValid}
              className={`w-[300px] py-2.5 rounded text-sm mt-4 transition-colors duration-200 ${
                isEmailValid
                  ? "bg-pink-500 hover:bg-pink-600"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="w-[300px] flex items-center gap-2 mb-2 text-sm">
              <span className="text-white">📧</span>
              <span className="font-semibold">{emailValue}</span>
            </div>

            <div className="relative w-[300px] mt-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요!"
                className="w-full py-2.5 px-3 pr-10 bg-black border border-white rounded text-white text-sm"
                {...registerPassword("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <span className="text-red-500 text-xs w-[300px] mt-1">
              {pwErrors.password?.message || " "}
            </span>

            <div className="relative w-[300px] mt-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호를 다시 한 번 입력해주세요!"
                className="w-full py-2.5 px-3 pr-10 bg-black border border-white rounded text-white text-sm"
                {...registerPassword("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <span className="text-red-500 text-xs w-[300px] mt-1">
              {pwErrors.confirmPassword?.message || " "}
            </span>

            <button
              type="submit"
              disabled={!isPasswordValid}
              className={`w-[300px] py-2.5 rounded text-sm mt-4 transition-colors duration-200 ${
                isPasswordValid
                  ? "bg-pink-500 hover:bg-pink-600"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="w-[300px] flex flex-col items-center gap-4">
              <div className="w-[120px] h-[120px] bg-sky-100 rounded-full" />
              <input
                type="text"
                placeholder="닉네임을 입력해주세요"
                className="w-full py-2.5 px-3 mt-5 bg-black border border-white rounded text-white text-sm"
                {...registerNickname("nickname")}
              />
              <span className="text-red-500 text-xs w-full text-center -mt-2">
                {nicknameErrors.nickname?.message || " "}
              </span>
              <button
                type="submit"
                disabled={!isNicknameValid}
                className={`w-full py-3 mt-1.5 rounded text-sm transition-colors duration-200 ${
                  isNicknameValid
                    ? "bg-pink-500 hover:bg-pink-600"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                회원가입 완료
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default SignUpPage;
