import * as S from "./styles/ItemTagStyle";

type Props = {
  item: {
    id: number;
    name: string;
  };
  isEditMode?: boolean;
  onRemove?: (id: number) => void;
};

const ItemTag = ({ item, isEditMode = false, onRemove }: Props) => {
  return (
    <div className={S.ItemTagContainer}>
      <p className={S.ItemTagP}>#{item.name}</p>
      {isEditMode && (
        <button
          type="button"
          onClick={() => onRemove?.(item.id)}
          className={`${S.ItemTagP} cursor-pointer`}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ItemTag;
