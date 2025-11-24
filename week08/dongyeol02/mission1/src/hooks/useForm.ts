import { useState } from "react";
import type {
  FormValues,
  FormErrors,
  FormTouched,
  ValidationRules,
  UseFormReturn,
} from "../types/form";

const useForm = (
  initialValues: FormValues,
  validationRules: ValidationRules
): UseFormReturn => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});

  //유효성 검사 함수
  const validate = (name: string, value: string): boolean => {
    if (validationRules[name]) {
      const error = validationRules[name](value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
      return !error;
    }
    return true;
  };
  //입력 필드 값이 변화 할때 저장 하는 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      validate(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validate(name, value);
  };
  // 마지막에 로그인 버튼 활성화 하기 위해 검사하는 함수
  const validateAll = (): boolean => {
    let isValid = true;
    Object.keys(validationRules).forEach((name) => {
      const fieldValid = validate(name, values[name] || "");
      if (!fieldValid) isValid = false;
    });
    return isValid;
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setValues,
    setErrors,
  };
};

export default useForm;
