// 폼 데이터의 타입 정의
export type UserSignInInformation = {
  email: string;
  password: string;
};

// 로그인 시 유효성 검사 함수
export const validateUserSignIn = (values: UserSignInInformation) => {
  const errors: Partial<UserSignInInformation> = {}; // 에러를 저장할 객체 초기화

  // 이메일 정규 표현식 (예시: 엄격하지 않은 기본적인 이메일 형식 검사)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // 1. 이메일 유효성 검사
  if (!emailRegex.test(values.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  // 2. 비밀번호 유효성 검사 (8자에서 20자 사이)
  if (values.password.length > 20) {
    errors.password = "비밀번호는 8자에서 20자 사이로 입력해야 합니다.";
  }
  if (values.password.length < 8) {
    errors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
  }

  return errors;
};
