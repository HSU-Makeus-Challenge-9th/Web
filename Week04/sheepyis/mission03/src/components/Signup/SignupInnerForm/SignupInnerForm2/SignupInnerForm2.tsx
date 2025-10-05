import * as S from "./styles/SignupInnerForm2Style";
import Input from "../../../Common/Input/Input";
import AuthButton from "../../../Common/Button/AuthButton/AuthButton";
import { useFormContext } from "react-hook-form";
import type { SignupValues } from "../../../../types/auth/auth";
import {
  validatePassword,
  validatePasswordConfirm,
} from "../../../../utils/auth/validators";

type Props = { onPrev?: () => void; onNext?: () => void | Promise<void> };

const SignupInnerForm2 = ({ onNext }: Props) => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useFormContext<SignupValues>();

  const email = watch("email");

  const confirmValidator = validatePasswordConfirm(() => getValues("password"));
  const onSubmit = handleSubmit(() => onNext?.());

  return (
    <form className={S.SignupInnerForm2Container} onSubmit={onSubmit}>
      <p className={S.EmailPreviewP}>이메일: {email || "(미입력)"} </p>

      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요!"
        error={errors.password?.message}
        {...register("password", {
          required: "비밀번호를 입력해주세요.",
          validate: (v) => {
            const msg = validatePassword(v);
            return msg ? msg : true;
          },
        })}
      />

      <Input
        type="password"
        placeholder="비밀번호를 다시 한 번 입력해주세요!"
        error={errors.passwordConfirm?.message}
        {...register("passwordConfirm", {
          required: "비밀번호를 다시 입력해주세요.",
          validate: (v) => {
            const msg = confirmValidator(v);
            return msg ? msg : true;
          },
        })}
      />

      <AuthButton text="다음" disabled={!isValid || isSubmitting} />
    </form>
  );
};

export default SignupInnerForm2;
