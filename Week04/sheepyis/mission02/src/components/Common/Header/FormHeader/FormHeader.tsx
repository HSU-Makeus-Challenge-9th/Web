import * as S from "./styles/FormHeaderStyle";
import { useNavigation } from "../../../../hooks/useNavigation";

type FormHeaderProps = {
  title: string;
};

const FormHeader = ({ title }: FormHeaderProps) => {
  const { handleBackClick } = useNavigation();

  return (
    <div className={S.FormHeaderContainer}>
      <p className={S.FormHeaderP} onClick={handleBackClick}>
        {"<"}
      </p>
      <p className={S.FormHeaderTitle}>{title}</p>
    </div>
  );
};

export default FormHeader;
