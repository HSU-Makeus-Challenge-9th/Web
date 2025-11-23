import { useNavigate } from 'react-router-dom';
import type { Tag } from '../types/lp';

interface LPTagsProps {
  tags: Tag[];
}

const LPTags = ({ tags }: LPTagsProps) => {
  const navigate = useNavigate();

  if (!tags || tags.length === 0) return null;

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => navigate(`/?tag=${tag.name}`)}
          className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors cursor-pointer"
        >
          # {tag.name}
        </button>
      ))}
    </div>
  );
};

export default LPTags;