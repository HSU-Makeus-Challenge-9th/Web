import { useState } from 'react';
import { Send } from 'lucide-react';

interface CommentFormProps {
  lpId: number;
  onSubmit?: (content: string) => void;
  isSubmitting?: boolean;
}

const CommentForm = ({ lpId, onSubmit, isSubmitting = false }: CommentFormProps) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검증
    if (!content.trim()) {
      setError('댓글을 입력해주세요.');
      return;
    }
    
    if (content.length > 500) {
      setError('댓글은 500자 이내로 입력해주세요.');
      return;
    }

    setError('');
    onSubmit?.(content.trim());
    setContent(''); // 전송 후 내용 초기화
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    
    // 실시간 유효성 검증
    if (value.length > 500) {
      setError('댓글은 500자 이내로 입력해주세요.');
    } else {
      setError('');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* 댓글 입력 필드 */}
        <div className="relative">
          <textarea
            value={content}
            onChange={handleInputChange}
            placeholder="댓글을 남겨보세요..."
            disabled={isSubmitting}
            className={`w-full p-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              error 
                ? 'border-red-500 focus:ring-red-500/50' 
                : 'border-gray-600 focus:border-gray-500 focus:ring-blue-500/50'
            }`}
            rows={3}
            maxLength={500}
          />
          
          {/* 글자 수 카운터 */}
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {content.length}/500
          </div>
        </div>

        {/* 오류 메시지 */}
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* 제출 버튼 */}
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-400">
            로그인 후 댓글을 작성할 수 있습니다.
          </div>
          
          <button
            type="submit"
            disabled={!content.trim() || isSubmitting || !!error}
            className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium text-sm"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                작성 중...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                댓글 작성
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;