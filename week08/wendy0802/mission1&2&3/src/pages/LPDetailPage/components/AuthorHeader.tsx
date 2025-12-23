interface AuthorHeaderProps {
  author: { id: number; name: string; avatar: string | null };
  createdAt: string;
  currentUserId: number;
  onEdit: () => void;
  onConfirmDelete: () => void;
  deletePending?: boolean;
  getTimeAgo: (dateString: string) => string;
}

const AuthorHeader = ({
  author,
  createdAt,
  currentUserId,
  onEdit,
  onConfirmDelete,
  deletePending,
  getTimeAgo,
}: AuthorHeaderProps) => {
  const isOwner = author?.id === currentUserId;
  return (
    <div className="flex items-start justify-between mb-4 sm:mb-6 pb-4 border-b border-gray-700">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden shrink-0">
          {author?.avatar ? (
            <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-xs sm:text-sm">👤</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-white font-semibold text-sm sm:text-base truncate">
            {author?.name}
          </div>
          <div className="text-gray-400 text-xs mt-1">{getTimeAgo(createdAt)}</div>
        </div>
      </div>
      {isOwner && (
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button onClick={onEdit} className="rounded-lg border border-gray-600 px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-800">
            수정
          </button>
          <button
            onClick={onConfirmDelete}
            disabled={deletePending}
            className="rounded-lg border border-gray-600 px-3 py-1.5 text-sm text-red-300 hover:bg-gray-800 disabled:opacity-60"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthorHeader;


