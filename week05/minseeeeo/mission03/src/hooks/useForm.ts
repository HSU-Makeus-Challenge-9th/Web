import { useEffect, useState, type ChangeEvent } from "react";

interface UseFormProps<T> {
  initialValue: T; // { email: '', password: '' }
  // 값이 올바른지 검증하는 함수
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>();
  const [errors, setErrors] = useState<Record<string, string>>();

  // 사용자가 입력값을 바꿀때 실행되는 함수
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // reset 함수 (로그인 실패시, 입력값 초기화 용도)
  const resetForm = () => {
    setValues(initialValue);
    setTouched({});
    setErrors({});
  };

  // 이메일과 비번 input의 속성들을 가져오는 함수
  const getInputProps = (name: keyof T) => {
    const value = values[name];
    const onChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      handleChange(name, e.target.value);
    };

    const onBlur = () => {
      handleBlur(name);
    };

    return { value, onChange, onBlur };
  };

  // values 값이 바뀔때마다 실행
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return { values, errors, touched, getInputProps, resetForm };
}

export default useForm;
