import type { LpItem } from "../../../types/lp/lp";
import * as S from "./styles/ListLPStyle";
import ItemLp from "../ItemLP/ItemLP";

type Props = {
  data?: LpItem[];
};

const ListLp = ({ data }: Props) => {
  if (!data || data.length === 0) {
    return <p className={S.ListLPP}>데이터가 없습니다.</p>;
  }

  return (
    <div className={S.ListLPContainer}>
      {data.map((item) => (
        <ItemLp key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ListLp;
