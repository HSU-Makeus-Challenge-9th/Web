const CommentSkeleton = () => {
  return (
    <div className="py-4 border-b border-gray-800 animate-pulse">
      <div className="flex items-start gap-3 mb-2">
        {/* 아바타 - 더 눈에 띄게 */}
        <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0" />
        {/* 이름 + 날짜 */}
        <div className="flex-1">
          <div className="h-4 bg-gray-600 rounded w-24 mb-1" />
          <div className="h-3 bg-gray-600 rounded w-16" />
        </div>
      </div>
      {/* 댓글 내용 */}
      <div className="ml-13 space-y-2">
        <div className="h-3 bg-gray-600 rounded w-full" />
        <div className="h-3 bg-gray-600 rounded w-5/6" />
      </div>
    </div>
  );
};

export default CommentSkeleton;