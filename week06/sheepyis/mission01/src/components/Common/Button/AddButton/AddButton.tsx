import * as S from "./styles/AddButtonStyle";
import { useNavigation } from "../../../../hooks/useNavigation";

const AddButton = () => {
  const { handleMoveClick } = useNavigation();

  return (
    <button
      className={S.AddButtonContainer}
      onClick={() => handleMoveClick("/add")}
    >
      +
    </button>
  );
};

export default AddButton;
