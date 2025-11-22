import * as S from "./styles/SignupInnerForm3Style";
import Input from "../../../Common/Input/Input";
import AuthButton from "../../../Common/Button/AuthButton/AuthButton";
import { useFormContext } from "react-hook-form";
import type { SignupValues } from "../../../../utils/auth/signupSchema";
import { useSignupMutation } from "../../../../hooks/auth/useSignupMutation";

const SignupInnerForm3 = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<SignupValues>();

  const { mutate: signup, isPending } = useSignupMutation();
  const nameValue = watch("name");
  const disabled = !nameValue || !!errors.name || isPending;

  const submit = () =>
    handleSubmit(() => {
      const { email, password, name } = getValues();
      signup({ email, password, name });
    })();

  return (
    <form
      className={S.SignupInnerForm3Container}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={S.SignupProfileImg} />

      <Input
        placeholder="닉네임을 입력해주세요."
        error={errors.name?.message}
        {...register("name")}
      />

      <AuthButton text="회원가입 완료" onClick={submit} disabled={disabled} />
    </form>
  );
};

export default SignupInnerForm3;
