import { useParams } from "react-router-dom";
import { useLpDetail } from "../../hooks/lps/useLpDetailQuery";
import Detail from "../../components/LpDetail/Detail/Detail";
import * as S from "../../styles/pages/lpDetail/lpDetailStyle";
import Spinner from "../../components/Common/Spinner/Spinner";

const LpDetail = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const { data, isLoading } = useLpDetail(lpId);

  if (isLoading) {
    return (
      <div className={S.lpDetailContainer}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={S.lpDetailContainer}>
      <div className={S.lpDetailInnerContainer}>
        {data && <Detail data={data} />}
      </div>
    </div>
  );
};

export default LpDetail;
