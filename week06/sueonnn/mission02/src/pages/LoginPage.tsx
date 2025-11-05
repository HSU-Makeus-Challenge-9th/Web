// import { postSignin } from "../apis/auth";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { Link, useLocation } from "react-router-dom"; // 🚀 ADDED: useLocation 추가
import type { RequestSigninDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// 가상의 RequestSignInDto (AuthContext에서 사용되는 타입)
interface RequestSignInDto {
  email: string;
  password: string;
}

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // 🚀 ADDED: useLocation 훅 사용

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  // AuthGuard에서 전달된 'from' 경로를 가져옵니다. 기본값은 '/'
  const from = location.state?.from || "/";

  const handleSubmit = async () => {
    // 🚀 MODIFIED: login 함수 호출 및 성공 여부 확인 (AuthContext 수정 반영)
    const success = await login(values as RequestSignInDto);

    if (success) {
      // 로그인 성공 후, 'from' 경로로 리디렉션 (원래 가려던 페이지로 복귀)
      navigate(from, { replace: true });
    }
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 bg-black">
      <div className="flex flex-col gap-3">
        <div className="text-xl font-bold flex items-center justify-between relative py-5">
          <Link to="/" className="cursor-pointer text-white">
            &lt;
          </Link>
          <span className="absolute left-1/2 transform -translate-x-1/2 text-white">
            로그인
          </span>
        </div>

        <button
          type="button"
          disabled={false}
          className="w-full text-white border border-gray-200 py-3 rounded-md text-lg font-medium transition-colors cursor-pointer hover:bg-gray-700 disabled:bg-gray-900 disabled:cursor-not-allowed flex items-center justify-center relative"
        >
          <img
            src="https://img.icons8.com/color/512/google-logo.png"
            className="w-6 h-6 absolute left-4"
          />
          구글 로그인
        </button>

        <div className="relative flex justify-center py-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative bg-black px-10 text-sm text-white z-10">
            OR
          </div>
        </div>
        <input
          {...getInputProps("email")}
          className={`border border-[#ccc] w-[300px] p-[8px] rounded-sm placeholder:text-gray-400 text-white ${
            errors?.email && touched?.email
              ? "border-red-500 "
              : "border-gray-300"
          }`}
          type={"email"}
          placeholder="이메일을 입력해주세요!"
        />
        {errors?.email && touched?.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
        <input
          {...getInputProps("password")}
          className={`border border-[#ccc] w-[300px] p-[8px] rounded-sm placeholder:text-gray-400 text-white ${
            errors?.password && touched?.password
              ? "border-red-500"
              : "border-gray-300"
          }`}
          type={"password"}
          placeholder="비밀번호를 입력해주세요!"
        />
        {errors?.password && touched?.password && (
          <div className="text-sm text-red-500">{errors.password}</div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-pink-500 text-gray-50 py-3 rounded-md text-lg font-medium hover:bg-gray-700 transition-colors cursor-pointer disabled:bg-gray-900 disabled:cursor-not-allowed"
        >
          로그인
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
