import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const LoginPage = () => {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { values, getInputProps, errors, touched } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    console.log(values);
    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
      console.log(response);
    } catch (error) {
      alert(errors?.message);
    }
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 입력값이 비어있으면 true
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white px-4">
      <div className="w-full max-w-xs flex flex-col gap-5">
        {/* 상단 헤더 */}
        <div className="relative flex items-center justify-center">
          <Link to="/" className="absolute left-0 text-2xl font-bold">
            &lt;
          </Link>
          <h1 className="text-2xl text-center w-full">로그인</h1>
        </div>

        {/* 구글 로그인 버튼 */}
        <button
          type="button"
          className="relative flex items-center justify-center w-full border border-white py-3 rounded-md hover:bg-neutral-900 transition-colors"
        >
          {/* 아이콘: 왼쪽 정렬 */}
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-7 h-7 absolute left-3"
          />
          {/* 글씨: 정확히 가운데 */}
          <span className="w-full text-center text-md">구글 로그인</span>
        </button>

        {/* OR 구분선 */}
        <div className="flex items-center gap-12 text-white text-lg">
          <div className="flex-1 h-px bg-white" />
          OR
          <div className="flex-1 h-px bg-white" />
        </div>

        {/* 이메일 입력 */}
        <div className="flex flex-col gap-1">
          <input
            {...getInputProps("email")}
            name="email"
            className="border border-white w-full p-3 rounded-md bg-neutral-900 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
            type="email"
            placeholder="이메일을 입력해주세요!"
          />
          {errors?.email && touched?.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
        </div>

        {/* 비밀번호 입력 */}
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

        {/* 로그인 버튼 */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-pink-600 text-white py-3 rounded-md text-lg font-medium 
                     hover:bg-pink-500 transition-colors cursor-pointer
                     disabled:bg-neutral-900 disabled:text-neutral-500 disabled:cursor-not-allowed"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
