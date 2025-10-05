import * as S from "./styles/SignupInnerForm3Style";
import Input from "../../../Common/Input/Input";
import AuthButton from "../../../Common/Button/AuthButton/AuthButton";
import { useFormContext } from "react-hook-form";
import type { SignupValues } from "../../../../types/auth/auth";
import { useSignupMutation } from "../../../../hooks/auth/useSignupMutation";

const SignupInnerForm3 = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useFormContext<SignupValues>();

  const { mutate: signup, isPending } = useSignupMutation();

  const onSubmit = handleSubmit(() => {
    const { email, password, name } = getValues();
    signup({ email, password, name });
  });

  return (
    <form className={S.SignupInnerForm3Container} onSubmit={onSubmit}>
      <div className={S.SignupProfileImg} />

      <Input
        placeholder="닉네임을 입력해주세요."
        error={errors.name?.message}
        {...register("name", {
          required: "닉네임을 입력해주세요.",
        })}
      />

      <AuthButton
        text="회원가입 완료"
        disabled={!isValid || isSubmitting || isPending}
      />
    </form>
  );
};

export default SignupInnerForm3;
