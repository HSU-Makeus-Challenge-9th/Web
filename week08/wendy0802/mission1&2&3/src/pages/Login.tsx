import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authAPI } from "../apis/apis";
import Header from "../components/Header";
import { useMutation } from "@tanstack/react-query";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: authAPI.signIn,
    onSuccess: (data) => {
      if (!data.status) {
        setError("로그인에 실패했습니다.");
        return;
      }

      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      localStorage.setItem("userName", data.data.name);
      localStorage.setItem("userId", data.data.id.toString());

      navigate("/");
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("네트워크 오류가 발생했습니다.");
      }
      console.error("Login error:", err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ email, password });
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="w-full max-w-md p-8">
            <h1 className="text-white text-2xl font-bold text-center m-7">
              로그인
            </h1>
            <button className="w-full flex items-center justify-center gap-3 border border-white rounded-lg py-4 mb-6 hover:bg-gray-900 transition">
              <img
                src="/src/assets/google.png"
                alt="logo"
                className="w-6 h-6"
              />
              <span className="text-white font-medium">구글 로그인</span>
            </button>

            <div className="flex items-center mb-6">
              <div className="flex-1 border-t border-gray-600"></div>
              <span className="px-4 text-gray-400 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-600"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-4 bg-black border border-white rounded-lg focus:outline-none focus:border-pink-500 text-white"
                  placeholder="이메일을 입력해주세요!"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-gray-800 text-white py-4 rounded-lg font-semibold hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginMutation.isPending ? "로그인 중..." : "로그인"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
