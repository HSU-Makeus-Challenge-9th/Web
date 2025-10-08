import type { ValidationRules } from "../types/form";

export const loginValidationRules: ValidationRules = {
  email: (value: string): string => {
    if (!value) return "이메일을 입력해주세요.";
    //[^\s@]+ : 공백(\s)이나 @가 아닌 문자가 1개 이상 있어야 함
    //@ : 반드시 @ 기호가 있어야 함
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "옳바른 이메일 형식을 입력해주세요.";
    return "";
  },
  password: (value: string): string => {
    if (!value) return "비밀번호를 입력해주세요.";
    if (value.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
    return "";
  },
};
