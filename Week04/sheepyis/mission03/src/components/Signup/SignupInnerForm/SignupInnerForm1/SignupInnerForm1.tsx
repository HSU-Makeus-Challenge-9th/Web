import * as S from "./styles/SignupInnerForm1Style";
import Input from "../../../Common/Input/Input";
import AuthButton from "../../../Common/Button/AuthButton/AuthButton";
import { useFormContext } from "react-hook-form";
import type { SignupValues } from "../../../../types/auth/auth";
import { validateEmail } from "../../../../utils/auth/validators";

type Props = { onNext?: () => void };

const SignupInnerForm1 = ({ onNext }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useFormContext<SignupValues>();

  const onSubmit = handleSubmit(() => onNext?.());

  return (
    <form className={S.SignupInnerForm1Container} onSubmit={onSubmit}>
      <Input
        placeholder="이메일을 입력해주세요!"
        error={errors.email?.message}
        {...register("email", {
          required: "이메일을 입력해주세요.",
          validate: (v) => {
            const msg = validateEmail(v);
            return msg ? msg : true;
          },
        })}
      />

      <AuthButton text="다음" disabled={!isValid || isSubmitting} />
    </form>
  );
};

export default SignupInnerForm1;
