import * as S from "./styles/SignupInnerForm2Style";
import Input from "../../../Common/Input/Input/Input";
import AuthButton from "../../../Common/Button/AuthButton/AuthButton";
import { useFormContext } from "react-hook-form";
import type { SignupValues } from "../../../../schemas/auth/signupSchema";

type Props = { onPrev?: () => void; onNext?: () => void | Promise<void> };

const SignupInnerForm2 = ({ onNext }: Props) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<SignupValues>();

  const email = watch("email");
  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");

  const disabled =
    !password ||
    !passwordConfirm ||
    !!errors.password ||
    !!errors.passwordConfirm;

  return (
    <form
      className={S.SignupInnerForm2Container}
      onSubmit={(e) => e.preventDefault()}
    >
      <p className={S.EmailPreviewP}>이메일: {email || "(미입력)"} </p>

      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요! (8자 이상)"
        error={errors.password?.message}
        {...register("password")}
      />

      <Input
        type="password"
        placeholder="비밀번호를 다시 한 번 입력해주세요!"
        error={errors.passwordConfirm?.message}
        {...register("passwordConfirm")}
      />

      <AuthButton text="다음" onClick={() => onNext?.()} disabled={disabled} />
    </form>
  );
};

export default SignupInnerForm2;
