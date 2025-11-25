import { useForm } from "react-hook-form";
import {
  validateEmail,
  validatePassword,
} from "../../validation/auth/validators";

export type LoginValues = { email: string; password: string };

export const useLoginForm = (onValid?: (vals: LoginValues) => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginValues>({
    mode: "onChange",
    criteriaMode: "firstError",
    defaultValues: { email: "", password: "" },
  });

  const registerEmail = register("email", {
    required: "이메일을 입력해주세요.",
    validate: (v) => {
      const msg = validateEmail(v);
      return msg ? msg : true;
    },
  });

  const registerPassword = register("password", {
    required: "비밀번호를 입력해주세요.",
    validate: (v) => {
      const msg = validatePassword(v);
      return msg ? msg : true;
    },
  });

  const onSubmit = handleSubmit((vals) => onValid?.(vals));

  return {
    registerEmail,
    registerPassword,
    onSubmit,
    errors,
    isValid,
    isSubmitting,
  };
};
