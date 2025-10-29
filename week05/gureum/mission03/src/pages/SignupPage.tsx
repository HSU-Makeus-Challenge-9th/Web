import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { postSignup } from "../apis/auth";
import Navbar from "../components/Navbar";
import SignupPageEmail from "./SignupPageEmail";
import SignupPageName from "./SignupPageName";
import SignupPagePassword from "./SignupPagePassword";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 최대 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 최대 20자 이하여야 합니다." }),
    name: z
      .string()
      .min(2, { message: "닉네임은 2자 이상이어야 합니다." })
      .max(16, { message: "닉네임은 16자 이하여야 합니다." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

export type FormFields = z.infer<typeof schema>;
type SignupStep = "email" | "password" | "name";

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<SignupStep>("email");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const submitAndNavigate = methods.handleSubmit(async (formData) => {
    setIsSubmitting(true);
    const { passwordCheck, ...payload } = formData;

    try {
      await postSignup(payload);
      alert("회원가입이 완료되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  });

  const handleBack = () => {
    if (step === "email") {
      navigate("/");
      return;
    }
    if (step === "password") {
      setStep("email");
      return;
    }
    setStep("password");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      <Navbar active="signup" />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center mb-8 relative">
            <button
              type="button"
              onClick={handleBack}
              className="absolute left-0 text-white hover:text-gray-300"
              aria-label="이전 단계로 이동"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-semibold">회원가입</h2>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={submitAndNavigate} noValidate>
              {step === "email" && <SignupPageEmail onNext={() => setStep("password")} />}
              {step === "password" && (
                <SignupPagePassword
                  onBack={() => setStep("email")}
                  onNext={() => setStep("name")}
                />
              )}
              {step === "name" && (
                <SignupPageName onBack={() => setStep("password")} isSubmitting={isSubmitting} />
              )}
            </form>
          </FormProvider>

          <div className="mt-6 text-center text-sm text-gray-400">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="text-pink-500 hover:text-pink-400 underline">
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
