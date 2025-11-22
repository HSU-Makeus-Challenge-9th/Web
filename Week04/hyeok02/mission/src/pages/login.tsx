import { useNavigate } from "react-router-dom";
import { useLoginForm } from "../hooks/useloginform";

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    errors,
    isValid,
    onSubmit,
  } = useLoginForm();

  return (
    <div className="min-h-screen bg-black text-white flex items-start justify-center pt-[150px] select-none">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[450px] h-[360px] rounded-tl-[10px] bg-black flex flex-col items-center relative select-none"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-[0.5px] left-15 h-9.5 p-3 text-white hover:text-pink-400 flex items-center"
        >
          <span className="text-2xl font-bold">&lt;</span>
        </button>

        <h2 className="text-lg font-semibold mt-2 mb-4">로그인</h2>

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
          {...register("email")}
        />
        <span className="text-red-500 text-xs w-[300px] mt-1">
          {errors.email?.message || " "}
        </span>

        <input
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          className="w-[300px] py-2.5 px-3 mt-2 bg-black border border-white rounded text-white text-sm"
          {...register("password")}
        />
        <span className="text-red-500 text-xs w-[300px] mt-1">
          {errors.password?.message || " "}
        </span>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-[300px] py-2.5 rounded text-sm mt-4 transition-colors duration-200 ${
            isValid ? "bg-pink-500 hover:bg-pink-600" : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
