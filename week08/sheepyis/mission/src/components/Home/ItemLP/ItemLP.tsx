import { useNavigation } from "../../../hooks/useNavigation";
import type { LpItem } from "../../../types/lp/lp";
import ItemLPOverlay from "../ItemLPOverlay/ItemLPOverlay";
import * as S from "./styles/ItemLPStyle";
import { useState } from "react";

type Props = {
  item: LpItem;
};

const ItemLp = ({ item }: Props) => {
  const { handleMoveClick } = useNavigation();
  const [imgError, setImgError] = useState(false);

  const handleItemDetailClick = () => {
    handleMoveClick(`/lp/${item.id}`);
  };

  return (
    <div className={S.ItemLPContainer} onClick={handleItemDetailClick}>
      {imgError || !item.thumbnail ? (
        <div className={S.ItemLPNotImg} />
      ) : (
        <img
          src={item.thumbnail}
          alt={item.title}
          className={S.ItemLPImg}
          onError={() => setImgError(true)}
        />
      )}

      <ItemLPOverlay item={item} />
    </div>
  );
};

export default ItemLp;
