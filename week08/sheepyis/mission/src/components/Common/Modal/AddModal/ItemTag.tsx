import * as S from "./styles/ItemTagStyle";

interface ItemTagProps {
  tag: string;
  onRemove: () => void;
}

const ItemTag = ({ tag, onRemove }: ItemTagProps) => {
  return (
    <div className={S.ItemTagContainer}>
      <span>{tag}</span>
      <button className={S.RemoveButton} onClick={onRemove}>
        ✕
      </button>
    </div>
  );
};

export default ItemTag;
