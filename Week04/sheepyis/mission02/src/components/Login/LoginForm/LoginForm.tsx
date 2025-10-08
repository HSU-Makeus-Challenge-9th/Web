import * as S from "./styles/LoginFormStyle";
import FormHeader from "../../Common/Header/FormHeader/FormHeader";
import GoogleButton from "../../Common/Button/GoogleButton/GoogleButton";
import FormBar from "../../Common/FormBar/FormBar";
import LoginInnerForm from "../LoginInnerForm/LoginInnerForm";

const LoginForm = () => {
  return (
    <div className={S.LoginFormContainer}>
      <FormHeader title="로그인" />

      <GoogleButton />
      <FormBar />

      <LoginInnerForm />
    </div>
  );
};

export default LoginForm;
