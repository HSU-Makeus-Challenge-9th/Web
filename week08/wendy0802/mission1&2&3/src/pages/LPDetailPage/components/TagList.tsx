type Tag = { id: number; name: string };

interface TagListProps {
  tags?: Tag[];
}

const TagList = ({ tags }: TagListProps) => {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className="px-2 sm:px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full hover:bg-gray-600 transition cursor-pointer"
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagList;
