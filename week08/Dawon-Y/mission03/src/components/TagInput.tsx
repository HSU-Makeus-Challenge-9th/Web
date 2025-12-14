import React from 'react';

interface TagInputProps {
  tags: string[];
  tagInput: string;
  onTagInputChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  disabled?: boolean;
}

const TagInput: React.FC<TagInputProps> = ({
  tags,
  tagInput,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
  disabled,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAddTag();
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="LP Tag"
          value={tagInput}
          onChange={(e) => onTagInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
          disabled={disabled}
        />
        <button
          onClick={onAddTag}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition-colors"
          disabled={disabled}
        >
          Add
        </button>
      </div>

      {/* 태그 목록 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-700 border border-gray-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-2"
            >
              {tag}
              <button
                onClick={() => onRemoveTag(tag)}
                className="hover:text-gray-200"
                disabled={disabled}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;