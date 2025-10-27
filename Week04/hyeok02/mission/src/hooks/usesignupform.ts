import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailSchema,
  passwordSchema,
  nicknameSchema,
  EmailFormData,
  PasswordFormData,
  NicknameFormData,
} from "../schema/signupschema";
import { useLocalStorage } from "./uselocalstorage";
import { AxiosError } from "axios";
import { signUpUser } from "../apis/signup";
import { useNavigate } from "react-router-dom";

export const useSignupForm = () => {
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useLocalStorage("signup-email", "");
  const [nicknameValue, setNicknameValue] = useLocalStorage(
    "signup-nickname",
    ""
  );

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isValid: isEmailValid },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    formState: { errors: pwErrors, isValid: isPasswordValid },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const {
    register: registerNickname,
    handleSubmit: handleNicknameSubmit,
    formState: { errors: nicknameErrors, isValid: isNicknameValid },
  } = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameSchema),
    mode: "onChange",
  });

  const resetStorage = () => {
    setEmailValue("");
    setNicknameValue("");
  };

  const onNicknameSubmit = handleNicknameSubmit(async (data) => {
    try {
      const profileImage = null;
      const response = await signUpUser({
        email: emailValue,
        password: watch("password"),
        nickname: data.nickname,
        profileImage,
      });
      console.log("회원가입 성공:", response);

      localStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("nickname", data.nickname);

      window.dispatchEvent(new Event("storage"));

      resetStorage();
      navigate("/");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      console.error("회원가입 실패:", error.response?.data || error.message);
    }
  });

  return {
    emailValue,
    nicknameValue,
    registerEmail,
    handleEmailSubmit,
    emailErrors,
    isEmailValid,
    registerPassword,
    handlePasswordSubmit,
    pwErrors,
    isPasswordValid,
    watch,
    registerNickname,
    handleNicknameSubmit,
    onNicknameSubmit,
    nicknameErrors,
    isNicknameValid,
    resetStorage,
    setEmailValue,
  };
};
