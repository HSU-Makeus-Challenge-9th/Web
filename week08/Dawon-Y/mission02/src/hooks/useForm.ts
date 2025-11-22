import { useState } from 'react';
import type { ChangeEvent, FocusEvent, FormEvent } from 'react';

export interface FormErrors {
  [key: string]: string | undefined;
}

interface UseFormReturn<T> {
  values: T;
  errors: FormErrors;
  touched: Partial<Record<keyof T, boolean>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => (e: FormEvent<HTMLFormElement>) => void;
}

const useForm = <T extends Record<string, string>>(
  initialValues: T,
  validate: (values: T) => FormErrors
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const newValues = {
      ...values,
      [name]: value,
    } as T;
    
    setValues(newValues);

    if (touched[name as keyof T]) {
      const newErrors = validate(newValues);
      setErrors(newErrors);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    const newErrors = validate(values);
    setErrors(newErrors);
  };

  const handleSubmit = (onSubmit: (values: T) => void | Promise<void>) => (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as Partial<Record<keyof T, boolean>>);
    setTouched(allTouched);

    const newErrors = validate(values);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const result = onSubmit(values);
      if (result instanceof Promise) {
        result.catch((err) => console.error(err));
      }
    }
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

export default useForm;