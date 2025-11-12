import type { LpItem } from "../../../types/lp/lp";
import * as S from "./styles/ItemLPOverlayStyle";

type Props = {
  item: LpItem;
};

const ItemLPOverlay = ({ item }: Props) => {
  const formattedDate = item.createdAt.slice(0, 10);
  return (
    <div className={S.ItemLPOverlayContainer}>
      <p className={S.ItemLPOverlayP}>{item.title}</p>
      <div className={S.ItemLPOverlayExplainContainer}>
        <p className={S.ItemLPOverlayDateP}>{formattedDate}</p>
        <div className={`{S.ItemLPOverlayDateP} !mt-1`}>
          ❤️ {item.likes.length}
        </div>
      </div>
    </div>
  );
};

export default ItemLPOverlay;
