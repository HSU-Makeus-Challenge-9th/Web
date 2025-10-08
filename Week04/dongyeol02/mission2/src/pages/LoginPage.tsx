import { useNavigate, useLocation } from "react-router-dom";
import useForm from "../hooks/useForm";
import { loginValidationRules } from "../utils/validationRules";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { values, errors, touched, handleChange, handleBlur } = useForm(
    { email: "", password: "" },
    loginValidationRules
  );
  const isFormValid =
    !errors.email &&
    !errors.password &&
    values.email.trim() !== "" &&
    values.password.trim() !== "";

  const handleBackClick = () => {
    const hasPreviousState = location.key !== "default";

    if (hasPreviousState) {
      navigate(-1); // 이전 페이지가 있으면 뒤로가기
    } else {
      navigate("/"); // 없으면 홈으로 이동
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-screen p-5 bg-black text-white">
      <div className="h-15 w-120 flex items-center justify-center relative px-4">
        <button className="absolute left-10 text-2xl" onClick={handleBackClick}>
          &lt;
        </button>
        <div className="text-2xl">로그인</div>
      </div>
      <button className="border-2 rounded-xl h-15 w-120">구글 로그인</button>

      <div className="relative flex items-center w-120">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
      <div className="flex flex-col gap-3">
        <input
          className="h-15 w-120 border-2 bg-black rounded-xl p-2"
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        {errors.email && touched.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <input
          className="h-15 w-120 border-2 rounded-xl p-2"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        {errors.password && touched.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>
      <button
        className={`h-15 w-120 rounded-xl p-2 ${
          isFormValid
            ? "bg-pink-500 cursor-pointer"
            : "bg-gray-500 cursor-not-allowed"
        }`}
        disabled={!isFormValid}
      >
        로그인
      </button>
    </div>
  );
};

export default LoginPage;
