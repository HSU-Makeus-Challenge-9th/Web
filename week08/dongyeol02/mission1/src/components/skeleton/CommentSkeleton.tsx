import React from "react";

const CommentSkeleton: React.FC = () => {
  return (
    <div className="border-b border-gray-700 pb-3 animate-pulse">
      <div className="flex items-start space-x-3 mb-1">
        {/* 1. 프로필 (원 모양) */}
        <div className="h-8 w-8 bg-gray-700 rounded-full flex-shrink-0"></div>

        <div className="flex-1">
          {/* 2. 작성자 이름 */}
          <div className="h-4 w-20 bg-gray-700 rounded mb-1"></div>

          {/* 3. 댓글 내용 */}
          <div className="space-y-1">
            <div className="h-4 w-full bg-gray-700 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CommentSkeletonList: React.FC<{ count: number }> = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <CommentSkeleton key={index} />
      ))}
    </>
  );
};

export default CommentSkeleton;
