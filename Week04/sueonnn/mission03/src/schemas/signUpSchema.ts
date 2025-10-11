import { z } from "zod";

// Zod 스키마 정의
export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요.")
      .email("올바른 이메일 형식을 입력해주세요."), // 1단계: 이메일 유효성 검사

    password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."), // 2단계: 비밀번호 길이 검사

    passwordCheck: z.string().min(1, "비밀번호를 재확인해주세요."),

    nickname: z.string().min(2, "닉네임은 2자 이상이어야 합니다."), // 3단계: 닉네임 유효성 검사
  })
  // refine: 비밀번호 일치 확인 (2단계)
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

// 타입 추출
export type SignUpFormFields = z.infer<typeof signUpSchema>;

// 단계별 필드 그룹 (폼 전환 로직에 사용)
export const stepFields = [
  ["email"], // Step 1 fields
  ["password", "passwordCheck"], // Step 2 fields
  ["nickname"], // Step 3 fields
];

// API 요청 시 사용할 데이터 타입 (passwordCheck 제외)
export type RequestSignUpDTO = Omit<SignUpFormFields, "passwordCheck">;
