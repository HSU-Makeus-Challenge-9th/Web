import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = () => {};

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] bg-black text-white">
      <div className="flex flex-col items-center gap-4 w-[320px] p-6 bg-black rounded-md">
        <div className="w-full flex justify-center">
          <div className="relative w-[320px] mb-2">
            <Link
              to={-1 as any}
              className="absolute left-0 top-1 flex items-center gap-1 text-zinc-400 hover:text-white transition"
              aria-label="뒤로가기"
            >
              <span className="text-xl">&lt;</span>
            </Link>

            <h2 className="text-center text-lg font-semibold">로그인</h2>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 w-full border border-gray-600 py-2 rounded-md hover:bg-gray-900 transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>구글 로그인</span>
        </button>

        <div className="flex items-center w-full my-2">
          <hr className="flex-1 border-gray-700" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-700" />
        </div>

        <input
          {...getInputProps("email")}
          name="email"
          className={`w-full rounded-md border px-3 py-2 bg-transparent placeholder-gray-500 focus:outline-none ${
            errors?.email && touched?.email
              ? "border-red-500"
              : "border-gray-700 focus:border-pink-400"
          }`}
          type="email"
          placeholder="이메일을 입력해주세요!"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-400 text-sm w-full text-left">
            {errors.email}
          </div>
        )}

        <input
          {...getInputProps("password")}
          name="password"
          className={`w-full rounded-md border px-3 py-2 bg-transparent placeholder-gray-500 focus:outline-none ${
            errors?.password && touched?.password
              ? "border-red-500"
              : "border-gray-700 focus:border-pink-400"
          }`}
          type="password"
          placeholder="비밀번호를 입력해주세요!"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-400 text-sm w-full text-left">
            {errors.password}
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-gray-800 hover:bg-pink-600 disabled:bg-gray-600 text-white py-2 rounded-md font-medium transition-colors"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
