import { useState, useEffect, useRef } from "react";
import type { ChangeEvent } from "react";

interface useFormProps<T> {
    initialValues?: T;
    initialValue?: T;
    validate?: (values: T) => Record<keyof T, string>;
}

function useForm<T extends Record<string, any>>({ initialValues, initialValue, validate }: useFormProps<T>) {
    const resolvedInitialValues = initialValues ?? initialValue;

    if (!resolvedInitialValues) {
        throw new Error("useForm 훅을 사용할 때는 initialValues(또는 initialValue)를 전달해야 합니다.");
    }

    const initialRef = useRef(resolvedInitialValues);
    const [values, setValues] = useState<T>(resolvedInitialValues);
    const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    useEffect(() => {
        initialRef.current = resolvedInitialValues;
    }, [resolvedInitialValues]);

    const handleChange = (name: keyof T, text: string) => {
        setValues((prev) => ({ ...prev, [name]: text }));
    };

    const handleBlur = (name: keyof T) => {
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const resetForm = () => {
        setValues(initialRef.current);
        setTouched({});
        setErrors({});
    };

    const getInputProps = (name: keyof T) => {
        const value = values[name];
        const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            handleChange(name, e.target.value);

        const onBlur = () => handleBlur(name);

        return { value, onChange, onBlur };
    };

    useEffect(() => {
        if (!validate) return;
        const newErrors = validate(values);
        setErrors(newErrors);
    }, [validate, values]);

    return { values, errors, touched, getInputProps, resetForm };
}

export default useForm;