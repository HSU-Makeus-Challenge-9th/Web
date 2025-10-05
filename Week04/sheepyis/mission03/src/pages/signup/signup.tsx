import SignupForm from "../../components/Signup/SignupForm/SignupForm";
import * as S from "../../styles/pages/login/LoginStyle";

const Signup = () => {
  return (
    <div className={S.LoginContainer}>
      <SignupForm />
    </div>
  );
};

export default Signup;
