import * as S from "./styles/HeaderButtonStyle";

type HeaderButtonProps = {
  label: string;
  backgroundColor?: string;
  onClick?: () => void;
};

const HeaderButton = ({
  label,
  backgroundColor,
  onClick,
}: HeaderButtonProps) => {
  return (
    <button
      className={`${S.HeaderButtonContainer} ${backgroundColor}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default HeaderButton;
