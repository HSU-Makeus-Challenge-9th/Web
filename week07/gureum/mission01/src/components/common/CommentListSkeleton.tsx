const CommentSkeleton = () => {
  return (
    <div className="flex gap-3 p-4 animate-pulse-enhanced">
      {/* 프로필 이미지 스켈레톤 */}
      <div className="w-10 h-10 bg-gray-400 rounded-full flex-shrink-0"></div>
      
      {/* 댓글 내용 스켈레톤 */}
      <div className="flex-1 space-y-2">
        {/* 사용자명 스켈레톤 */}
        <div className="w-20 h-4 bg-gray-400 rounded"></div>
        
        {/* 댓글 텍스트 스켈레톤 (여러 줄) */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-400 rounded"></div>
          <div className="w-3/4 h-4 bg-gray-400 rounded"></div>
        </div>
        
        {/* 날짜 스켈레톤 */}
        <div className="w-16 h-3 bg-gray-400 rounded"></div>
      </div>
    </div>
  );
};

const CommentListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="space-y-1">
      {Array.from({ length: count }).map((_, index) => (
        <CommentSkeleton key={index} />
      ))}
    </div>
  );
};

export default CommentListSkeleton;