import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { postSignup } from "../apis/auth";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const passwordCheckValue = watch("passwordCheck");
  const nameValue = watch("name");

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;
    try {
      await postSignup(rest);
      alert("회원가입이 완료되었습니다!");
      navigate("/"); // 홈 화면으로 이동
    } catch (e) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white px-4">
      <div className="w-full max-w-xs flex flex-col gap-5">
        {/* 상단 헤더 */}
        <div className="relative flex items-center justify-center">
          <Link to="/" className="absolute left-0 text-2xl font-bold">
            &lt;
          </Link>
          <h1 className="text-2xl text-center w-full">회원가입</h1>
        </div>

        {/* STEP 1: 이메일 */}
        {step === 1 && (
          <>
            {/* 구글 로그인 버튼 */}
            <button
              type="button"
              className="relative flex items-center justify-center w-full border border-white py-3 rounded-md hover:bg-neutral-900 transition-colors"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-7 h-7 absolute left-3"
              />
              <span className="w-full text-center text-md">구글 로그인</span>
            </button>

            {/* OR 구분선 */}
            <div className="flex items-center gap-12 text-white text-lg">
              <div className="flex-1 h-px bg-white" />
              OR
              <div className="flex-1 h-px bg-white" />
            </div>

            <div className="flex flex-col gap-1">
              <input
                {...register("email")}
                name="email"
                className="border border-white w-full p-3 rounded-md bg-neutral-900 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
                type="email"
                placeholder="이메일을 입력해주세요!"
              />
              {errors.email && (
                <div className="text-red-500 text-sm">
                  {errors.email.message}
                </div>
              )}
            </div>

            <button
              type="button"
              disabled={!emailValue || !!errors.email}
              onClick={() => setStep(2)}
              className="w-full bg-pink-600 text-white py-3 rounded-md text-lg font-medium 
                         hover:bg-pink-500 transition-colors cursor-pointer
                         disabled:bg-neutral-900 disabled:text-neutral-500 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </>
        )}

        {/* STEP 2: 비밀번호 */}
        {step === 2 && (
          <>
            <p>✉️ {emailValue}</p>
            <div className="flex flex-col gap-1">
              <div className="relative">
                <input
                  {...register("password")}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="border border-white w-full p-3 rounded-md bg-neutral-900 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
                  placeholder="비밀번호를 입력해주세요!"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              {errors.password && (
                <div className="text-red-500 text-sm">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="relative">
                <input
                  {...register("passwordCheck")}
                  name="passwordCheck"
                  type={showPasswordCheck ? "text" : "password"}
                  className="border border-white w-full p-3 rounded-md bg-neutral-900 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
                  placeholder="비밀번호 확인"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordCheck((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPasswordCheck ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              {errors.passwordCheck && (
                <div className="text-red-500 text-sm">
                  {errors.passwordCheck.message}
                </div>
              )}
            </div>

            <button
              type="button"
              disabled={
                !passwordValue ||
                !passwordCheckValue ||
                !!errors.password ||
                !!errors.passwordCheck
              }
              onClick={() => setStep(3)}
              className="w-full bg-pink-600 text-white py-3 rounded-md text-lg font-medium 
                         hover:bg-pink-500 transition-colors cursor-pointer
                         disabled:bg-neutral-900 disabled:text-neutral-500 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </>
        )}

        {/* STEP 3: 이름 */}
        {step === 3 && (
          <>
            <div className="flex flex-col items-center">
              <img
                src="https://www.studiopeople.kr/common/img/default_profile.png"
                alt="기본 프로필"
                className="w-45 h-45 rounded-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <input
                {...register("name")}
                name="name"
                className="border border-white w-full p-3 rounded-md bg-neutral-900 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
                type="text"
                placeholder="이름을 입력해주세요!"
              />
              {errors.name && (
                <div className="text-red-500 text-sm">
                  {errors.name.message}
                </div>
              )}
            </div>

            <button
              disabled={!nameValue || !!errors.name || isSubmitting}
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="w-full bg-pink-600 text-white py-3 rounded-md text-lg font-medium 
                         hover:bg-pink-500 transition-colors cursor-pointer
                         disabled:bg-neutral-900 disabled:text-neutral-500 disabled:cursor-not-allowed"
            >
              회원가입 완료
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
