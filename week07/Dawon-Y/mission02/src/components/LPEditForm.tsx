import { useState } from 'react';

interface LPEditFormProps {
  title: string;
  content: string;
  tags: string[];
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onTagsChange: (tags: string[]) => void;
  disabled?: boolean;
}

const LPEditForm = ({
  content,
  tags,
  onContentChange,
  onTagsChange,
  disabled,
}: LPEditFormProps) => {
  const [newTagInput, setNewTagInput] = useState('');

  const handleAddTag = () => {
    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
      onTagsChange([...tags, newTagInput.trim()]);
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      {/* 내용 입력 */}
      <div className="mb-6">
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="LP 내용"
          rows={6}
          className="w-full bg-gray-800 border border-gray-700 text-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 transition-colors resize-none"
          disabled={disabled}
        />
      </div>

      {/* 태그 입력 */}
      <div className="mb-6">
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newTagInput}
            onChange={(e) => setNewTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            placeholder="태그 추가 (Enter)"
            className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500 transition-colors"
            disabled={disabled}
          />
          <button
            onClick={handleAddTag}
            disabled={disabled}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
          >
            추가
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800 text-pink-400 rounded-full text-sm"
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                disabled={disabled}
                className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default LPEditForm;