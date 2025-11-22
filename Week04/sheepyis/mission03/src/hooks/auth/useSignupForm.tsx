import { useState } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupValues } from "../../utils/auth/signupSchema";

export const fieldsByStep: Record<number, FieldPath<SignupValues>[]> = {
  1: ["email"],
  2: ["password", "passwordConfirm"],
  3: ["name"],
};

const MAX_STEP = 3;

export const useSignupForm = (initialStep = 1) => {
  const methods = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    criteriaMode: "firstError",
    defaultValues: { email: "", password: "", passwordConfirm: "", name: "" },
    shouldUnregister: false,
  });

  const [step, setStep] = useState(initialStep);

  const next = async () => {
    const names = fieldsByStep[step];
    if (!names) return;
    const ok = await methods.trigger(names, { shouldFocus: true });
    if (ok && step < MAX_STEP) setStep((s) => s + 1);
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  return { methods, step, next, prev };
};
