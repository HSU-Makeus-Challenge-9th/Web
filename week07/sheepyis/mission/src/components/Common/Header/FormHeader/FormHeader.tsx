import * as S from "./styles/FormHeaderStyle";
import { useNavigation } from "../../../../hooks/useNavigation";

type FormHeaderProps = {
  title: string;
  onBack?: () => void;
};

const FormHeader = ({ title, onBack }: FormHeaderProps) => {
  const { handleBackClick } = useNavigation();

  const handleClick = () => {
    if (onBack) return onBack();
    handleBackClick();
  };

  return (
    <div className={S.FormHeaderContainer}>
      <p className={S.FormHeaderP} onClick={handleClick}>
        {"<"}
      </p>
      <p className={S.FormHeaderTitle}>{title}</p>
    </div>
  );
};

export default FormHeader;
