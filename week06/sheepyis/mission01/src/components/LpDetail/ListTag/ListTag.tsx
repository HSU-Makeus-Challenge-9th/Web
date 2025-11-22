import ItemTag from "../ItemTag/ItemTag";
import * as S from "./styles/ListTagStyle";

type Tag = {
  id: number;
  name: string;
};

type Props = {
  data: Tag[];
};

const ListTag = ({ data }: Props) => {
  return (
    <div className={S.ListTagContainer}>
      {data.map((tag) => (
        <ItemTag key={tag.id} item={tag} />
      ))}
    </div>
  );
};

export default ListTag;
