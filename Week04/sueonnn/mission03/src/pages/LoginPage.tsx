import { useForm } from "../hooks/useForm"; // 경로에 맞게 수정 필요
import { UserSignInInformation, validateUserSignIn } from "../utils/validate"; // 경로에 맞게 수정 필요

function LoginPage() {
  const { values, errors, touched, getInutProps } =
    useForm<UserSignInInformation>({
      initialValues: {
        email: "",
        password: "",
      },
      validate: validateUserSignIn,
    });

  // 에러가 하나라도 있는지 확인
  const isAnyError = Object.keys(errors).length > 0;
  // 입력 값이 하나라도 비어 있는지 확인
  const isAnyValueEmpty = Object.values(values).some((v) => v === "");
  // 버튼 비활성화 조건: 에러가 있거나, 값이 비어 있으면 비활성화 (true)
  const isDisabled = isAnyError || isAnyValueEmpty;

  const handleLoginSubmit = () => {
    // 여기서 API 요청 로직 (Axios 등)을 연결합니다.
    console.log("로그인 시도 (API 요청 로직 연결):", values);

    // 예시 API 요청 (실제 요청 시 Async/Await 사용)
    // const response = await axios.post('/api/login', values);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-3 w-[400px]">
        <h1 className="text-3xl font-bold mb-4 text-center">로그인</h1>

        {/* 이메일 입력 필드 */}
        <input
          type="email"
          placeholder="이메일"
          className={`border p-2 rounded-md focus:outline-none focus:border-[#807bFF] 
            ${errors.email && touched.email ? "border-red-500 bg-red-100" : "border-gray-300"}`}
          {...getInutProps("email")}
        />
        {/* 이메일 에러 메시지: 'touched' 상태이고 'errors'가 있을 때만 표시 */}
        {errors.email && touched.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}

        <input
          type="password"
          placeholder="비밀번호"
          className={`border p-2 rounded-md focus:outline-none focus:border-[#807bFF] 
            ${errors.password && touched.password ? "border-red-500 bg-red-100" : "border-gray-300"}`}
          {...getInutProps("password")}
        />
        {/* 비밀번호 에러 메시지: 'touched' 상태이고 'errors'가 있을 때만 표시 */}
        {errors.password && touched.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        {/* 로그인 버튼 */}
        <button
          onClick={handleLoginSubmit}
          disabled={isDisabled}
          className={`w-full py-3 mt-4 text-white font-semibold rounded-md transition-colors 
            ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            }`}
        >
          로그인
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
