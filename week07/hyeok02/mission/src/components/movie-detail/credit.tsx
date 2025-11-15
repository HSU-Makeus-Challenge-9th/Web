import type { TagType } from "../../types/lp";

interface Props {
  tag: TagType;
}

const TagItem = ({ tag }: Props) => (
  <span className="text-xs bg-gray-700 px-3 py-1 rounded-full text-gray-200">
    #{tag.name}
  </span>
);

export default TagItem;
