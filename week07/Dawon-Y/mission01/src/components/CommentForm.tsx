import { useState } from 'react';

interface CommentFormProps {
  onSubmit: (content: string) => void;
  isSubmitting: boolean;
}

const CommentForm = ({ onSubmit, isSubmitting }: CommentFormProps) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError('댓글을 입력해주세요.');
      return;
    }

    if (content.length < 2) {
      setError('댓글은 최소 2자 이상 입력해주세요.');
      return;
    }

    onSubmit(content);
    setContent('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative">
        <input
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (error) setError('');
          }}
          placeholder="댓글을 입력해주세요"
          disabled={isSubmitting}
          className="w-full bg-gray-800 text-white px-4 py-3 pr-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        >
          {isSubmitting ? '작성중...' : '작성'}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </form>
  );
};

export default CommentForm;