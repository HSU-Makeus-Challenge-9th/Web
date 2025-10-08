// src/pages/SignUpPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { postSignup } from "../apis/auth";
import type { RequestSignupDto } from "../types/auth";

type FormValues = {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
};

const validateSignup = (v: FormValues): Record<keyof FormValues, string> => {
  const e: Record<keyof FormValues, string> = {
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
  };

  // 이메일
  if (!v.email.trim()) e.email = "이메일을 입력해주세요.";
  else {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(v.email)) e.email = "올바른 이메일 형식이 아닙니다.";
  }

  // 비밀번호
  if (!v.password) e.password = "비밀번호를 입력해주세요.";
  else if (v.password.length < 8 || v.password.length > 20)
    e.password = "비밀번호는 8~20자입니다.";

  // 비밀번호 확인 + 일치
  if (!v.passwordCheck) e.passwordCheck = "비밀번호 확인이 필요합니다.";
  else if (v.password !== v.passwordCheck)
    e.passwordCheck = "비밀번호가 일치하지 않습니다.";

  // 이름(최종 단계용)
  if (!v.name.trim()) e.name = "이름을 입력해주세요.";

  return e;
};

const EyeIcon = ({ open = false }: { open?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
    {open ? (
      <path fill="currentColor" d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" />
    ) : (
      <path fill="currentColor" d="M3.27 2 2 3.27l3.07 3.07C3.08 7.53 2 9.5 2 12c0 0 3 7 10 7 2.3 0 4.2-.7 5.77-1.72L20.73 21 22 19.73 3.27 2Zm6.5 6.5 1.2 1.2c.34-.17.7-.27 1.03-.27a3 3 0 0 1 3 3c0 .33-.1.69-.27 1.03l1.2 1.2A4.97 4.97 0 0 0 17 12c0-2.76-2.24-5-5-5-.87 0-1.69.22-2.23.5ZM12 17c-.87 0-1.69-.22-2.23-.5l1.2-1.2c.34.17.7.27 1.03.27a3 3 0 0 0 3-3c0-.33-.1-.69-.27-1.03l1.2-1.2c.48.54.5 1.36.5 2.23 0 2.76-2.24 5-5 5Z" />
    )}
  </svg>
);

export default function SignUpPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { values, errors, touched, getInputProps } = useForm<FormValues>({
    initialValue: { email: "", password: "", passwordCheck: "", name: "" },
    validate: validateSignup,
  });

  // Step1: 이메일 형식 OK일 때만 활성화 (errors가 ""여야 함)
  const canNextStep1 = values.email.trim() !== "" && errors?.email === "";

  // Step2: 길이 OK + 서로 일치해야 활성화
  const pwOk =
    values.password.length >= 8 &&
    values.password.length <= 20 &&
    values.passwordCheck.length >= 8 &&
    values.passwordCheck.length <= 20 &&
    errors?.password === "" &&
    errors?.passwordCheck === "";

  // Step3: 이름 OK
  const canSubmit = values.name.trim().length > 0 && errors?.name === "";

  const handleComplete = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    try {
      const body: RequestSignupDto = {
        email: values.email,
        password: values.password,
        name: values.name,
      };
      await postSignup(body); // 회원가입 처리
      navigate("/", { replace: true }); // 홈으로 이동
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 shadow-xl backdrop-blur">
        {/* 헤더 */}
        <div className="mb-6 flex items-center gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => (s === 1 ? 1 : ((s - 1) as 1 | 2 | 3)))}
              className="rounded-full p-2 text-zinc-400 hover:bg-zinc-900"
              aria-label="뒤로"
            >
              ←
            </button>
          )}
          <h2 className="mx-auto text-2xl font-semibold tracking-tight">회원가입</h2>
        </div>

        {/* STEP 1: 이메일 */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm text-zinc-300">이메일</label>
              <input
                id="email"
                {...getInputProps("email")}
                type="email"
                placeholder="이메일을 입력해주세요"
                className={`w-full rounded-md border bg-zinc-900/60 px-3 py-2 text-sm placeholder:text-zinc-500 outline-none
                focus:border-pink-400 focus:ring-2 focus:ring-pink-500/30
                ${errors?.email && touched?.email ? "border-red-500 ring-2 ring-red-500/20" : "border-zinc-800"}`}
              />
              {errors?.email && touched?.email && (
                <p className="text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => canNextStep1 && setStep(2)}
              disabled={!canNextStep1}
              className="mt-2 w-full rounded-md bg-pink-500 py-2.5 text-sm font-semibold text-white transition
                         hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-zinc-700"
            >
              다음
            </button>

            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="h-px flex-1 bg-zinc-800" />
              <span>또는</span>
              <span className="h-px flex-1 bg-zinc-800" />
            </div>

            <button
              type="button"
              className="w-full rounded-md border border-zinc-700 bg-zinc-900/40 py-2.5 text-sm text-zinc-200 hover:bg-zinc-900"
            >
              <span className="inline-flex items-center gap-2 justify-center">
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt=""
                  className="h-4 w-4"
                />
                구글 로그인
              </span>
            </button>
          </div>
        )}

        {/* STEP 2: 비밀번호 */}
        {step === 2 && (
          <div className="space-y-4">
            {/* 이메일 읽기용 */}
            <div className="space-y-1.5">
              <label className="text-sm text-zinc-300">이메일</label>
              <div className="flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm">
                <span className="text-zinc-300">{values.email}</span>
                <button
                  type="button"
                  className="text-xs text-zinc-400 hover:text-zinc-200"
                  onClick={() => setStep(1)}
                >
                  변경
                </button>
              </div>
            </div>

            {/* 비밀번호 */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm text-zinc-300">비밀번호</label>
              <div className={`flex items-center gap-2 rounded-md border px-3
                ${errors?.password ? "border-red-500 ring-2 ring-red-500/20" : "border-zinc-800"}
                bg-zinc-900/60 focus-within:border-pink-400 focus-within:ring-2 focus-within:ring-pink-500/30`}>
                <input
                  id="password"
                  {...getInputProps("password")}
                  type={showPw ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요"
                  className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-zinc-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-200"
                  aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
                >
                  <EyeIcon open={showPw} />
                </button>
              </div>
              {errors?.password && <p className="text-xs text-red-400">{errors.password}</p>}
            </div>

            {/* 비밀번호 확인 */}
            <div className="space-y-1.5">
              <label htmlFor="passwordCheck" className="text-sm text-zinc-300">비밀번호 확인</label>
              <div className={`flex items-center gap-2 rounded-md border px-3
                ${errors?.passwordCheck ? "border-red-500 ring-2 ring-red-500/20" : "border-zinc-800"}
                bg-zinc-900/60 focus-within:border-pink-400 focus-within:ring-2 focus-within:ring-pink-500/30`}>
                <input
                  id="passwordCheck"
                  {...getInputProps("passwordCheck")}
                  type={showPw2 ? "text" : "password"}
                  placeholder="비밀번호를 다시 입력해주세요"
                  className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-zinc-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPw2((v) => !v)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-200"
                  aria-label={showPw2 ? "비밀번호 숨기기" : "비밀번호 보기"}
                >
                  <EyeIcon open={showPw2} />
                </button>
              </div>

              {/* 불일치 즉시 안내 */}
              {values.passwordCheck && values.password !== values.passwordCheck && (
                <p className="text-xs text-red-400">비밀번호가 일치하지 않습니다.</p>
              )}
              {!(
                values.passwordCheck && values.password !== values.passwordCheck
              ) && errors?.passwordCheck && (
                <p className="text-xs text-red-400">{errors.passwordCheck}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => pwOk && setStep(3)}
              disabled={!pwOk}
              className="mt-2 w-full rounded-md bg-pink-500 py-2.5 text-sm font-semibold text-white transition
                         hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-zinc-700"
            >
              다음
            </button>
          </div>
        )}

{step === 3 && (
  <div className="space-y-5">
    {/* 아바타 더미 */}
    <div className="mx-auto h-28 w-28 rounded-full bg-zinc-800 flex items-center justify-center">
      <svg width="56" height="56" viewBox="0 0 24 24" className="text-zinc-400">
        <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.33 0-8 2.17-8 5v1h16v-1c0-2.83-3.67-5-8-5Z" />
      </svg>
    </div>

    <div className="space-y-1.5">
      <label htmlFor="name" className="text-sm text-zinc-300">닉네임</label>
      <input
        id="name"
        {...getInputProps("name")}
        type="text"
        placeholder="닉네임을 입력해주세요"
        className={`w-full rounded-md border bg-zinc-900/60 px-3 py-2 text-sm placeholder:text-zinc-500 outline-none
          focus:border-pink-400 focus:ring-2 focus:ring-pink-500/30
          ${errors?.name && touched?.name ? "border-red-500 ring-2 ring-red-500/20" : "border-zinc-800"}`}
      />
      {errors?.name && touched?.name && (
        <p className="text-xs text-red-400">{errors.name}</p>
      )}
    </div>

    <button
      type="button"
      onClick={async () => {
        await handleComplete();        // 가입 처리
        navigate("/", { replace: true }); // 홈으로 이동
        alert("회원가입 완료")
      }}
      disabled={!canSubmit || submitting}
      className="w-full rounded-md bg-pink-500 py-2.5 text-sm font-semibold text-white transition
                 hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-zinc-700 inline-flex items-center justify-center"
    >
      {submitting ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        "회원가입 완료"
      )}
    </button>
  </div>
)}
      </div>
    </div>
  );
}
