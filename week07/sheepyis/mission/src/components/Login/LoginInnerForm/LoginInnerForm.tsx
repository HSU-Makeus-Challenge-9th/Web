import * as S from "./styles/LoginInnerFormStyle";
import Input from "../../Common/Input/Input/Input";
import AuthButton from "../../Common/Button/AuthButton/AuthButton";
import { useLoginForm } from "../../../hooks/auth/useLoginForm";
import { useLoginMutation } from "../../../hooks/auth/useLoginMutation";

const LoginInnerForm = () => {
  const { mutate: login, isPending } = useLoginMutation();

  const {
    registerEmail,
    registerPassword,
    errors,
    isValid,
    isSubmitting,
    onSubmit,
  } = useLoginForm((vals) => {
    login(vals);
  });

  return (
    <form className={S.LoginInnerFormContainer} onSubmit={onSubmit}>
      <Input
        placeholder="이메일을 입력해주세요!"
        error={errors.email?.message}
        {...registerEmail}
      />

      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요!"
        error={errors.password?.message}
        {...registerPassword}
      />
      <AuthButton
        text="로그인"
        disabled={!isValid || isSubmitting || isPending}
      />
    </form>
  );
};

export default LoginInnerForm;
