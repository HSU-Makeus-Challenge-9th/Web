import * as S from "./styles/ListTagStyle";
import ItemTag from "./ItemTag";

interface ListTagProps {
  tags: string[];
  onRemoveTag: (tag: string) => void;
}

const ListTag = ({ tags, onRemoveTag }: ListTagProps) => {
  return (
    <div className={S.ListTagContainer}>
      {tags.map((tag) => (
        <ItemTag key={tag} tag={tag} onRemove={() => onRemoveTag(tag)} />
      ))}
    </div>
  );
};

export default ListTag;
