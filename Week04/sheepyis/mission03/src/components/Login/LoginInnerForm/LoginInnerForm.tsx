import * as S from "./styles/LoginInnerFormStyle";
import Input from "../../Common/Input/Input";
import AuthButton from "../../Common/Button/AuthButton/AuthButton";
import { useLoginForm } from "../../../hooks/auth/useLoginForm";
import { useLoginMutation } from "../../../hooks/auth/useLoginMutation";

const LoginInnerForm = () => {
  const {
    email,
    password,
    emailError,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLoginForm();

  const { mutate: login, isPending } = useLoginMutation();

  const isFormValid = email && password && !emailError && !passwordError;

  return (
    <form
      className={S.LoginInnerFormContainer}
      onSubmit={handleSubmit(() => {
        login({ email, password });
      })}
    >
      <Input
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
        placeholder="이메일을 입력해주세요!"
        error={emailError}
      />

      <Input
        type="password"
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
        placeholder="비밀번호를 입력해주세요!"
        error={passwordError}
      />

      <AuthButton text="로그인" disabled={!isFormValid || isPending} />
    </form>
  );
};

export default LoginInnerForm;
