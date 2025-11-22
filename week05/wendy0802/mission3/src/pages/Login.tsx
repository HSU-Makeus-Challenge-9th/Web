import { useNavigate } from "react-router-dom";
import { useLoginForm } from "../hooks/useLogin";

export default function Login() {
  const navigate = useNavigate();
  const {
    emailRegister,
    passwordRegister,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
  } = useLoginForm();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoogleLogin = async () => {
    const baseURL =
      import.meta.env.VITE_API_URL || "http://localhost:8000/";
    window.location.href = `${baseURL}v1/auth/google/login`;
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
          LOGIN
        </h1>
        {/* 구글 로그인 버튼 */}
        <button
          type="submit"
          onClick={handleGoogleLogin}
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

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 이메일 */}
          <div className="mb-6">
            <input
              type="email"
              placeholder="이메일을 입력해주세요"
              {...emailRegister}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="mb-6">
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...passwordRegister}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <div className="mb-6">
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
                로그인
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
