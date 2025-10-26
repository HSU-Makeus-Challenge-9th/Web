import * as S from "./styles/GoogleButtonStyle";
import GoogleLogo from "../../../../assets/images/auth/googleLogo.png";

const GoogleButton = () => {
  return (
    <button className={S.GoogleButtonContainer}>
      <img className={S.GoogleLogoImg} src={GoogleLogo} alt="google" />
      <p className={S.GoogleButtonP}>구글 로그인</p>
    </button>
  );
};

export default GoogleButton;
