import { useState, useRef, useEffect } from 'react';
import { formatDate } from '../utils/dateFormat';
import type { Comment } from '../types/comment';

interface CommentItemProps {
  comment: Comment;
  onDelete?: (commentId: number) => void;
  onEdit?: (commentId: number, content: string) => void;
  isAuthor?: boolean;
}

const CommentItem = ({ comment, onDelete, onEdit, isAuthor }: CommentItemProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [error, setError] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleDelete = () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      onDelete?.(comment.id);
      setShowMenu(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setShowMenu(false);
    setEditContent(comment.content);
    setError('');
  };

  const handleEditSubmit = () => {
    if (!editContent.trim()) {
      setError('댓글을 입력해주세요.');
      return;
    }

    if (editContent.length < 2) {
      setError('댓글은 최소 2자 이상 입력해주세요.');
      return;
    }

    if (editContent === comment.content) {
      setIsEditing(false);
      return;
    }

    onEdit?.(comment.id, editContent);
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditContent(comment.content);
    setError('');
  };

  return (
    <div className="py-4 border-b border-gray-800">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0">
            {comment.author.avatar ? (
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-sm font-bold">
                {comment.author.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="text-white font-medium">{comment.author.name}</p>
            <p className="text-gray-400 text-xs">{formatDate(comment.createdAt)}</p>
          </div>
        </div>

        {/* 내가 작성한 댓글만 메뉴 표시 */}
        {isAuthor && !isEditing && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="옵션"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </button>

            {/* 드롭다운 메뉴 */}
            {showMenu && (
              <div className="absolute right-0 mt-1 w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                <button
                  onClick={handleEditClick}
                  className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors rounded-t-lg"
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-700 transition-colors rounded-b-lg"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 댓글 내용 또는 수정 폼 */}
      <div className="ml-13">
        {isEditing ? (
          <div>
            <textarea
              value={editContent}
              onChange={(e) => {
                setEditContent(e.target.value);
                if (error) setError('');
              }}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
              rows={3}
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleEditSubmit}
                className="px-4 py-1.5 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors text-sm"
              >
                저장
              </button>
              <button
                onClick={handleEditCancel}
                className="px-4 py-1.5 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-300 text-sm">{comment.content}</p>
        )}
      </div>
    </div>
  );
};

export default CommentItem;