export interface FormValues {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormTouched {
  [key: string]: boolean;
}

export interface ValidationRules {
  [key: string]: (value: string) => string;
}

export interface UseFormReturn {
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  validateAll: () => boolean;
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}
