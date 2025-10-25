import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email("올바른 이메일 형식을 입력해주세요."),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "8자 이상 입력해주세요.")
      .regex(/[A-Z]/, "대문자를 포함해야 합니다.")
      .regex(/[a-z]/, "소문자를 포함해야 합니다.")
      .regex(/\d/, "숫자를 포함해야 합니다.")
      .regex(/[@$!%*?&]/, "특수문자를 포함해야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export const nicknameSchema = z.object({
  nickname: z.string().min(1, "닉네임은 필수입니다."),
});

export type EmailFormData = z.infer<typeof emailSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
export type NicknameFormData = z.infer<typeof nicknameSchema>;
