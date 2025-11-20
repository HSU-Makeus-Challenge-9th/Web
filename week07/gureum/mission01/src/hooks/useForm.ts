import { useState, useEffect, useRef } from "react";
import type { ChangeEvent } from "react";

interface UseFormProps<T> {
    initialValues?: T;
    initialValue?: T; // @deprecated: Use initialValues instead
    validate?: (values: T) => Record<keyof T, string>;
}

function useForm<T extends Record<string, any>>({ initialValues, initialValue, validate }: UseFormProps<T>) {
    const formInitialValues = initialValues ?? initialValue;

    if (!formInitialValues) {
        throw new Error("useForm 훅을 사용할 때는 initialValues를 전달해야 합니다. initialValue는 deprecated되었습니다.");
    }

    const initialValuesRef = useRef(formInitialValues);
    const [values, setValues] = useState<T>(formInitialValues);
    const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof T, boolean>>>({});
    const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof T, string>>>({});

    useEffect(() => {
        initialValuesRef.current = formInitialValues;
    }, [formInitialValues]);

    const handleFieldChange = (name: keyof T, value: string) => {
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleFieldBlur = (name: keyof T) => {
        setTouchedFields((prevTouched) => ({ ...prevTouched, [name]: true }));
    };

    const resetForm = () => {
        setValues(initialValuesRef.current);
        setTouchedFields({});
        setValidationErrors({});
    };

    const getInputProps = (name: keyof T) => {
        const value = values[name];
        const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            handleFieldChange(name, e.target.value);

        const onBlur = () => handleFieldBlur(name);

        return { value, onChange, onBlur };
    };

    useEffect(() => {
        if (!validate) return;
        const newValidationErrors = validate(values);
        setValidationErrors(newValidationErrors);
    }, [validate, values]);

    return { 
        values, 
        errors: validationErrors, 
        touched: touchedFields, 
        getInputProps, 
        resetForm 
    };
}

export default useForm;