import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
  message?: string;
}

interface FormField {
  value: string;
  error?: string;
  isValid: boolean;
}

interface FormState {
  [key: string]: FormField;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

export const useForm = (initialValues: { [key: string]: string }, validationRules: ValidationRules) => {
  const [formState, setFormState] = useState<FormState>(() => {
    const initialState: FormState = {};
    Object.keys(initialValues).forEach(key => {
      initialState[key] = {
        value: initialValues[key],
        error: '',
        isValid: false
      };
    });
    return initialState;
  });

  const validateField = useCallback((fieldName: string, value: string): { isValid: boolean; error: string } => {
    const rules = validationRules[fieldName];
    if (!rules) return { isValid: true, error: '' };

    if (rules.required && !value.trim()) {
      return { isValid: false, error: rules.message || '필수 입력 항목입니다.' };
    }

    if (value.trim() && rules.minLength && value.length < rules.minLength) {
      return { isValid: false, error: rules.message || `최소 ${rules.minLength}자 이상 입력해주세요.` };
    }

    if (value.trim() && rules.pattern && !rules.pattern.test(value)) {
      return { isValid: false, error: rules.message || '형식이 올바르지 않습니다.' };
    }

    return { isValid: true, error: '' };
  }, [validationRules]);

  const handleChange = useCallback((fieldName: string, value: string) => {
    const validation = validateField(fieldName, value);
    
    setFormState(prev => ({
      ...prev,
      [fieldName]: {
        value,
        error: validation.error,
        isValid: validation.isValid
      }
    }));
  }, [validateField]);

  const handleBlur = useCallback((fieldName: string) => {
    const value = formState[fieldName].value;
    const validation = validateField(fieldName, value);
    
    setFormState(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        error: validation.error,
        isValid: validation.isValid
      }
    }));
  }, [formState, validateField]);

  const getFieldProps = useCallback((fieldName: string) => ({
    value: formState[fieldName]?.value || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(fieldName, e.target.value),
    onBlur: () => handleBlur(fieldName),
    error: formState[fieldName]?.error,
    isValid: formState[fieldName]?.isValid
  }), [formState, handleChange, handleBlur]);

  const isFormValid = Object.values(formState).every(field => field.isValid && field.value.trim() !== '');

  const reset = useCallback(() => {
    const resetState: FormState = {};
    Object.keys(initialValues).forEach(key => {
      resetState[key] = {
        value: initialValues[key],
        error: '',
        isValid: false
      };
    });
    setFormState(resetState);
  }, [initialValues]);

  return {
    formState,
    getFieldProps,
    isFormValid,
    reset
  };
};