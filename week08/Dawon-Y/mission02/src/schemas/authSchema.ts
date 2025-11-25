import { z } from 'zod';

// 이메일 스키마
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식을 입력해주세요.'),
});

// 비밀번호 스키마
export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 16자 이하여야 합니다.'),
  passwordCheck: z.string(),
}).refine((data) => data.password === data.passwordCheck, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['passwordCheck'],
});

// 닉네임 스키마
export const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 2자 이상이어야 합니다.')
    .max(10, '닉네임은 10자 이하여야 합니다.'),
});

// 전체 회원가입 스키마
export const signupSchema = emailSchema
  .merge(passwordSchema)
  .merge(nicknameSchema);

// 로그인 스키마
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.'),
});

// 타입 추출
export type EmailFormData = z.infer<typeof emailSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
export type NicknameFormData = z.infer<typeof nicknameSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;