import { z } from "zod";

//이메일
export const emailStepSchema = z.object({
  email: z.email({ message: "유효하지 않은 이메일 형식입니다." }),
});
export type EmailStepForm = z.infer<typeof emailStepSchema>;

//닉넴
export const nicknameStepSchema = z.object({
  nickname: z.string().min(2, { message: "닉네임은 2글자 이상이어야 합니다." }),
});
export type NicknameStepForm = z.infer<typeof nicknameStepSchema>;

//비밀번호/비밀번호 확인
export const passwordStepSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
    confirmPassword: z
      .string()
      .min(6, { message: "비밀번호 확인을 입력해주세요." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type PasswordStepForm = z.infer<typeof passwordStepSchema>;

// 전체 회원가입
export const signupSchema = z
  .object({
    email: z.email({ message: "유효하지 않은 이메일 형식입니다." }),
    password: z
      .string()
      .min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
    confirmPassword: z
      .string()
      .min(6, { message: "비밀번호 확인을 입력해주세요." }),
    nickname: z
      .string()
      .min(2, { message: "닉네임은 2글자 이상이어야 합니다." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });
export type SignupForm = z.infer<typeof signupSchema>;
