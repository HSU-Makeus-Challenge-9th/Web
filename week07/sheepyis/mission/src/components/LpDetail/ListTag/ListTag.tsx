import ItemTag from "../ItemTag/ItemTag";
import * as S from "./styles/ListTagStyle";

type Tag = {
  id: number;
  name: string;
};

type Props = {
  data: Tag[];
  isEditMode?: boolean;
  onRemove?: (id: number) => void;
};

const ListTag = ({ data, isEditMode = false, onRemove }: Props) => {
  return (
    <div className={S.ListTagContainer}>
      {data.map((tag) => (
        <ItemTag
          key={tag.id}
          item={tag}
          isEditMode={isEditMode}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default ListTag;
