import * as S from "./styles/HeaderButtonStyle";

type HeaderButtonProps = {
  label: string;
  backgroundColor?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const HeaderButton = ({
  label,
  backgroundColor,
  onClick,
  disabled = false,
}: HeaderButtonProps) => {
  return (
    <button
      className={`${S.HeaderButtonContainer} ${backgroundColor}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default HeaderButton;
