import * as S from "./styles/AuthButtonStyle";

type AuthButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

const AuthButton = ({ text, onClick, disabled = false }: AuthButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${S.AuthButtonContainer} ${
        disabled ? "bg-gray-800 cursor-not-allowed" : "bg-pink-600"
      }`}
    >
      {text}
    </button>
  );
};

export default AuthButton;
