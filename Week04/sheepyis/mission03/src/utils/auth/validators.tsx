export const validateEmail = (email: string) =>
  /\S+@\S+\.\S+/.test(email) ? "" : "올바른 이메일 형식을 입력해주세요.";

export const validatePassword = (password: string) =>
  password.length >= 8 ? "" : "비밀번호는 8자 이상이어야 합니다.";

export const validatePasswordConfirm =
  (getPassword: () => string, message = "비밀번호가 일치하지 않습니다.") =>
  (confirm: string) =>
    confirm === getPassword() ? "" : message;
