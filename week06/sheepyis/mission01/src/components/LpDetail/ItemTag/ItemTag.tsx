import * as S from "./styles/ItemTagStyle";

type Props = {
  item: {
    id: number;
    name: string;
  };
};

const ItemTag = ({ item }: Props) => {
  return (
    <div className={S.ItemTagContainer}>
      <p className={S.ItemTagP}>#{item.name}</p>
    </div>
  );
};

export default ItemTag;
