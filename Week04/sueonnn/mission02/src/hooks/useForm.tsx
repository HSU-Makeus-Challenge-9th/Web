import { ChangeEvent, useEffect, useState } from "react";

// T는 폼 값의 구조 (예: { email: string, password: string })를 나타내는 제네릭 타입입니다.
type FormValues<T> = Record<keyof T, string>;
type FormErrors<T> = Record<keyof T, string>;
type FormTouched<T> = Record<keyof T, boolean>;

interface UseFormProps<T> {
  initialValues: FormValues<T>;
  validate: (values: FormValues<T>) => FormErrors<T>;
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  validate,
}: UseFormProps<T>) => {
  // 1. 폼의 입력 값 상태
  const [values, setValues] = useState<FormValues<T>>(initialValues);

  // 2. 입력 필드의 에러 메시지 상태
  const [errors, setErrors] = useState<FormErrors<T>>({} as FormErrors<T>);

  // 3. 입력 필드가 건드려졌는지(onBlur 발생) 여부 상태
  const [touched, setTouched] = useState<FormTouched<T>>({} as FormTouched<T>);

  // 폼 값이 변경될 때마다 유효성 검사를 실행
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [values, validate]);

  // 입력 필드에 필요한 속성을 한 번에 제공하는 함수
  const getInutProps = (name: keyof T) => {
    // 입력 값 변경 핸들러
    const handleInputChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      e.persist();
      const text = e.target.value;

      // 불변성 유지를 위해 기존 값 복사 후, 해당 이름의 값만 업데이트
      setValues((prevValues) => ({
        ...prevValues,
        [name]: text,
      }));
    };

    // 필드 포커스가 해제될 때(blur) 핸들러
    const handleBlur = () => {
      // 해당 필드가 'touched' 되었음을 표시 (에러 메시지 표시 조건)
      setTouched((prevTouched) => ({
        ...prevTouched,
        [name]: true,
      }));
    };

    return {
      name,
      value: values[name],
      onChange: handleInputChange,
      onBlur: handleBlur,
    };
  };

  return {
    values,
    errors,
    touched,
    getInutProps,
  };
};
