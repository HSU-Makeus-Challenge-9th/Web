import { useState } from "react";
import { useInfiniteComments } from "../../../hooks/useInfiniteComments";

interface CommentsProps {
  lpId: number;
}

const Comments = ({ lpId }: CommentsProps) => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteComments(lpId, order);

  // pages 배열을 flatMap으로 변환
  const comments = data?.pages.flatMap((page) => page.data) ?? [];

  // 무한 스크롤 트리거는 상위에서 공용 훅을 써도 되지만, 댓글은 버튼으로만 로딩하도록 유지

  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}초 전`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}일 전`;
  };

  // Skeleton UI 컴포넌트
  const CommentSkeleton = () => (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-700 shrink-0"></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-4 bg-gray-700 rounded w-24"></div>
            <div className="h-3 bg-gray-700 rounded w-16"></div>
          </div>
          <div className="h-3 bg-gray-700 rounded w-full mb-1"></div>
          <div className="h-3 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );

  if (isError) {
    return (
      <div>
        {/* 제목과 정렬 버튼 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-bold">댓글</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setOrder("asc")}
              className={`px-3 py-1.5 rounded-lg transition text-sm ${
                order === "asc"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              오래된순
            </button>
            <button
              onClick={() => setOrder("desc")}
              className={`px-3 py-1.5 rounded-lg transition text-sm ${
                order === "desc"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              최신순
            </button>
          </div>
        </div>

        {/* 댓글 입력 */}
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="댓글을 입력하세요."
              className="flex-1 bg-gray-800 border border-pink-500 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-4 py-2 rounded-lg transition text-sm shrink-0">
              작성
            </button>
          </div>
        </div>

        <div className="text-red-500 text-sm">
          {error instanceof Error
            ? error.message
            : "댓글을 불러오는데 실패했습니다."}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 제목과 정렬 버튼 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl font-bold">댓글</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setOrder("asc")}
            className={`px-3 py-1.5 rounded-lg transition text-sm ${
              order === "asc"
                ? "bg-pink-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder("desc")}
            className={`px-3 py-1.5 rounded-lg transition text-sm ${
              order === "desc"
                ? "bg-pink-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      {/* 댓글 입력 */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="댓글을 입력하세요."
            className="flex-1 bg-gray-800 border border-pink-500 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-4 py-2 rounded-lg transition text-sm shrink-0">
            작성
          </button>
        </div>
      </div>

      {/* 초기 로딩 - 상단에 Skeleton UI */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <CommentSkeleton key={i} />
          ))}
        </div>
      ) : comments.length > 0 ? (
        <>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden shrink-0">
                    {comment.author.avatar ? (
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-sm">👤</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white font-semibold text-sm">
                        {comment.author.name}
                      </span>
                      <span className="text-gray-500">|</span>
                      <span className="text-gray-400 text-xs">
                        {getTimeAgo(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed wrap-break-word">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 추가 로딩 - 하단에만 Skeleton UI */}
          {isFetchingNextPage && (
            <div className="mt-4 space-y-4">
              {[...Array(3)].map((_, i) => (
                <CommentSkeleton key={`skeleton-${i}`} />
              ))}
            </div>
          )}

          {/* 더 보기 버튼 */}
          {hasNextPage && !isFetchingNextPage && (
            <div className="mt-4 text-center">
              <button
                onClick={() => fetchNextPage()}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition text-sm"
              >
                더 보기
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-400 py-8 text-sm">
          댓글이 없습니다.
        </div>
      )}
    </div>
  );
};

export default Comments;
