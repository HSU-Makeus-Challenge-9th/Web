import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().email("올바른 이메일 형식을 입력해주세요."),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    passwordConfirm: z.string().min(1, "비밀번호를 다시 입력해주세요."),
    name: z.string(),
  })
  .refine((v) => v.password === v.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type SignupValues = z.infer<typeof signupSchema>;
