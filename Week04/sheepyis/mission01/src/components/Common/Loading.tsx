import Spinner from "./Spinner/Spinner";
import * as S from "./CommonStyle";

const Loading = () => {
  return (
    <div className={S.CommonContainer}>
      <Spinner />
    </div>
  );
};

export default Loading;
