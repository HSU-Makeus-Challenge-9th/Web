import { useForm } from "react-hook-form";

export interface LoginFormData {
    email: string;
    password: string;
}

export const useLoginForm = () => {
    const{
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginFormData>({
        mode: "onChange",
    });

    const emailRegister = register("email",{
        required: "이메일을 입력해주세요",
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "올바른 이메일 형식을 입력해주세요.",
        },
    });

    const passwordRegister = register("password",{
        required: "비밀번호를 입력해주세요",
        minLength: {
            value: 6,
            message: "비밀번호는 최소 6자 이상이어야 합니다",
        },
    });


return {
    emailRegister,
    passwordRegister,
    handleSubmit,
    errors,
    isValid,
} as const 
};
