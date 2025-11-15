import { ClipLoader } from "react-spinners";
import * as S from "./styles/SpinnerStyle";

const Spinner = () => {
  return (
    <div className={S.SpinnerContainer}>
      <div className={S.SpinnerInnerContainer}>
        <ClipLoader color="#4ade80" size="100%" />
      </div>
    </div>
  );
};

export default Spinner;
