import LoginForm from "../../components/Login/LoginForm/LoginForm";
import * as S from "../../styles/pages/login/LoginStyle";

const Login = () => {
  return (
    <div className={S.LoginContainer}>
      <LoginForm />
    </div>
  );
};

export default Login;
