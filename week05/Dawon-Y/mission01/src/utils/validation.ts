import type { FormErrors } from '../hooks/useForm';
import type { LoginFormValues, SignupFormValues } from '../types/auth';

export const validateLogin = (values: LoginFormValues): FormErrors => {
  const errors: FormErrors = {};

  // 이메일 검증
  if (!values.email) {
    errors.email = '이메일을 입력해주세요.';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  // 비밀번호 검증
  if (!values.password) {
    errors.password = '비밀번호를 입력해주세요.';
  } else if (values.password.length < 8) {
    errors.password = '비밀번호는 8자 이상이어야 합니다.';
  }

  return errors;
};

export const validateSignup = (values: SignupFormValues): FormErrors => {
  const errors = validateLogin(values);

  // 비밀번호 확인 검증
  if (!values.passwordCheck) {
    errors.passwordCheck = '비밀번호 확인을 입력해주세요.';
  } else if (values.password !== values.passwordCheck) {
    errors.passwordCheck = '비밀번호가 일치하지 않습니다.';
  }

  return errors;
};