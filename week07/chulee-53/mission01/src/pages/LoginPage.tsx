import { Link } from "react-router-dom";
import useForm from "../hooks/useForm.ts";
import {
  validateSignin,
  type UserSigninInformation,
} from "../utils/validate.ts";
import { useLogin } from "../hooks/mutations/useLogin";

const LoginPage = () => {
  const { values, getInputProps, errors, touched } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const { mutate: handleLogin, isPending } = useLogin();

  const handleSubmit = () => {
    handleLogin(values);
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white px-4">
      <div className="w-full max-w-xs flex flex-col gap-5">
        <div className="relative flex items-center justify-center">
          <Link to="/" className="absolute left-0 text-2xl font-bold">
            &lt;
          </Link>
          <h1 className="text-2xl text-center w-full">로그인</h1>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="relative flex items-center justify-center w-full border border-white py-3 rounded-md hover:bg-neutral-900 transition-colors cursor-pointer"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-7 h-7 absolute left-3"
          />
          <span className="w-full text-center text-md">구글 로그인</span>
        </button>

        <div className="flex items-center gap-12 text-white text-lg">
          <div className="flex-1 h-px bg-white" />
          OR
          <div className="flex-1 h-px bg-white" />
        </div>

        <div className="flex flex-col gap-1">
          <input
            {...getInputProps("email")}
            className="border border-white w-full p-3 rounded-md bg-neutral-900 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
            type="email"
            placeholder="이메일을 입력해주세요!"
          />
          {errors?.email && touched?.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            {...getInputProps("password")}
            className="border border-white w-full p-3 rounded-md bg-neutral-900 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
            type="password"
            placeholder="비밀번호를 입력해주세요!"
          />
          {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled || isPending}
          className="w-full bg-pink-600 text-white py-3 rounded-md text-lg font-medium 
                     hover:bg-pink-500 transition-colors cursor-pointer
                     disabled:bg-neutral-900 disabled:text-neutral-500 disabled:cursor-not-allowed"
        >
          {isPending ? "로그인 중..." : "로그인"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
