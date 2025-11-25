import * as S from "./styles/GoogleButtonStyle";
import GoogleLogo from "../../../../assets/images/auth/googleLogo.png";

const GoogleButton = () => {
  const googleLoginUrl = `${
    import.meta.env.VITE_API_BASE_URL
  }auth/google/login`;

  const handleClick = () => {
    window.location.href = googleLoginUrl;
  };

  return (
    <button className={S.GoogleButtonContainer} onClick={handleClick}>
      <img className={S.GoogleLogoImg} src={GoogleLogo} alt="google" />
      <p className={S.GoogleButtonP}>구글 로그인</p>
    </button>
  );
};

export default GoogleButton;
