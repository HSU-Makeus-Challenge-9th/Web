import * as S from "./styles/AddButtonStyle";

interface AddButtonProps {
  onClick?: () => void;
}

const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <button className={S.AddButtonContainer} onClick={onClick}>
      +
    </button>
  );
};

export default AddButton;
