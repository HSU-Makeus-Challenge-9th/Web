export type UserSigninInformation = {
    email: string;
    password: string;
};

function validateUser(values: UserSigninInformation): Record<keyof UserSigninInformation, string> {
    const errors = {
        email: "",
        password: "",
    };

    if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(values.email)) {
        errors.email = "이메일 형식이 올바르지 않습니다.";
    }
    
    if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "비밀번호는 최소 8~20자 사이로 입력해야 합니다.";
    }
    
    return errors;
}

function validateSignin(values: UserSigninInformation) {
    return validateUser(values);
}
export {validateSignin};
