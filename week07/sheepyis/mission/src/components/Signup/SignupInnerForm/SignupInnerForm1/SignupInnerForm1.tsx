import { useFormContext } from "react-hook-form";
import type { SignupValues } from "../../../../schemas/auth/signupSchema";
import Input from "../../../Common/Input/Input/Input";
import AuthButton from "../../../Common/Button/AuthButton/AuthButton";
import * as S from "./styles/SignupInnerForm1Style";

type Props = { onNext?: () => void | Promise<void> };

const SignupInnerForm1 = ({ onNext }: Props) => {
  const {
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useFormContext<SignupValues>();

  const email = watch("email");

  return (
    <form
      className={S.SignupInnerForm1Container}
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        type="email"
        placeholder="이메일을 입력해주세요!"
        error={errors.email?.message}
        {...register("email")}
      />
      <AuthButton
        text="다음"
        onClick={() => onNext?.()}
        disabled={!email || !!errors.email || isSubmitting}
      />
    </form>
  );
};

export default SignupInnerForm1;
