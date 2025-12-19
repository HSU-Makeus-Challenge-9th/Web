// src/components/LpCommentList.tsx

import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useLpComments } from "../../hooks/useLpComments";
import type { Comment } from "../../types/lp";
import { CommentSkeletonList } from "../skeleton/CommentSkeleton";

const LpCommentList = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const id = Number(lpid);

  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const [newComment, setNewComment] = useState("");
  const [isPosting, setIsPosting] = useState(false); // 댓글 작성 중 로딩 상태

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    // 댓글 작성 후 목록을 즉시 업데이트하기 위한 refetch 함수
    refetch,
  } = useLpComments(id, order);

  // 댓글 작성 처리 함수
  const handleCommentSubmit = useCallback(async () => {
    if (newComment.trim() === "" || isPosting) return;

    setIsPosting(true);
    // 실제 API 호출 대신 임시 로직 (예시)
    console.log(`[댓글 작성] LP ID: ${id}, 내용: ${newComment}`);

    // API 통신을 시뮬레이션 (1초 딜레이)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 작성 완료 후 상태 초기화 및 목록 새로고침
    setNewComment("");
    setIsPosting(false);

    // 댓글 작성 후 최신 댓글을 보기 위해 목록을 새로고침합니다.
    refetch();
  }, [newComment, id, isPosting, refetch]);

  // ID 유효성 체크 및 에러 처리
  if (isNaN(id)) {
    return (
      <div className="p-4 text-red-500 bg-gray-900">
        유효하지 않은 LP ID입니다.
      </div>
    );
  }
  if (isError) {
    return (
      <div className="p-4 text-red-500 bg-gray-900">
        댓글 로딩 에러: {error?.message}
      </div>
    );
  }

  // 데이터 평탄화
  const allComments: Comment[] = data?.pages.flatMap((page) => page.data) ?? [];

  const getButtonClass = (buttonOrder: "asc" | "desc") =>
    `px-3 py-1 text-sm rounded-full transition-colors ${
      order === buttonOrder
        ? "bg-pink-600 text-white font-bold"
        : "bg-gray-700 text-gray-400 hover:bg-gray-600"
    }`;

  return (
    <div className="comment-list-container p-6 bg-gray-800 text-white rounded-lg">
      <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
        댓글 ({isLoading ? 0 : allComments.length})
      </h3>

      {/* 정렬 버튼 그룹 (로딩 중에는 비활성화) */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setOrder("desc")}
          className={getButtonClass("desc")}
          disabled={isLoading}
        >
          **최신순 🔽**
        </button>
        <button
          onClick={() => setOrder("asc")}
          className={getButtonClass("asc")}
          disabled={isLoading}
        >
          **오래된순 🔼**
        </button>
      </div>

      {/* 댓글 작성 폼 통합 및 개선 */}
      <div className="flex space-x-2 mb-6 p-2 bg-gray-700 rounded-lg">
        {/* 프로필 이미지 자리 */}
        <div className="h-10 w-10 bg-gray-600 rounded-full flex-shrink-0 flex items-center justify-center text-xs">
          {/*  */}
        </div>
        <input
          className="w-full bg-gray-700 border-none outline-none text-white placeholder-gray-400 text-base"
          type="text"
          placeholder="댓글을 입력해주세요!"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            // 엔터키로 작성 가능
            if (e.key === "Enter") handleCommentSubmit();
          }}
          disabled={isPosting}
        />
        <button
          onClick={handleCommentSubmit}
          disabled={isPosting || newComment.trim() === ""}
          className={`text-center rounded-lg w-16 h-10 flex-shrink-0 transition ${
            isPosting || newComment.trim() === ""
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-pink-600 text-white hover:bg-pink-500"
          }`}
        >
          {isPosting ? "작성 중" : "작성"}
        </button>
      </div>

      {/* 💡 댓글 목록 또는 스켈레톤 */}
      <div className="space-y-4 pt-4 border-t border-gray-700">
        {isLoading ? (
          // 로딩 중일 때 스켈레톤 UI 렌더링
          <CommentSkeletonList count={4} />
        ) : allComments.length > 0 ? (
          allComments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-700 pb-3">
              <div className="flex items-start space-x-3 mb-1">
                {/* 실제 댓글 목록의 프로필 자리 */}
                <div className="h-8 w-8 bg-gray-600 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-gray-300">
                  {/*  */}
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    {/* 작성자 이름 표시 */}
                    <span className="font-semibold text-pink-500">
                      {comment.author.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                  {/* 댓글 내용 */}
                  <p className="text-gray-200 mt-1">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            아직 등록된 댓글이 없습니다. 첫 댓글을 남겨보세요!
          </p>
        )}
      </div>

      {/* 더 보기 버튼 (트리거) */}
      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage || isLoading}
            className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition"
          >
            {isFetchingNextPage ? "댓글 불러오는 중..." : "댓글 더 보기"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LpCommentList;
