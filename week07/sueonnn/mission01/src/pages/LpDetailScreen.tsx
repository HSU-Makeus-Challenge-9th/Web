// LpDetailScreen.tsx 파일 (최종 수정 버전 - isMyComment 타입 불일치 해결 포함)

import { useState, useRef, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getLpDetail,
  getLpComments,
  createComment,
  updateComment,
  deleteComment,
} from "../apis/lp";
import { calculateTimeAgo } from "../utils/date";
import { useAuth } from "../context/AuthContext";
import type {
  LpItem,
  Comment,
  CreateCommentDto,
  UpdateCommentDto,
} from "../types/lp";
import type { CursorBasedResponse, PAGINATION_ORDER } from "../types/common";
import { LpSkeleton, ErrorState } from "./LpListScreen";
import CommentSkeleton from "../components/CommentSkeleton";

// 정렬 순서 타입 정의
type SortOrder = "desc" | "asc";

// ----------------------------------------------------
// 🚀 CommentItem 컴포넌트 (댓글 수정/삭제 기능 포함)
// ----------------------------------------------------
interface CommentItemProps {
  comment: Comment;
  currentUserId: number | null;
  lpId: number;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  currentUserId,
  lpId,
}) => {
  const queryClient = useQueryClient();
  // 🚨 방어적 접근: author 객체와 name/nickname에 안전하게 접근
  const authorName = comment.author?.nickname || comment.author?.name || "익명";
  const timeAgo = calculateTimeAgo(comment.createdAt);

  // 🚨 **핵심 수정**: comment.authorId를 숫자로 변환하여 currentUserId와 비교합니다.
  const isMyComment = Number(comment.authorId) === currentUserId;

  // CommentItem 컴포넌트 내부에 추가
  console.log("DEBUG Menu Check:", {
    commentAuthorId: comment.authorId,
    currentUserId: currentUserId,
    isMyCommentResult: isMyComment,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const COMMENT_QUERY_KEY = ["lpCommentsInfinite", lpId];

  // 1. 댓글 수정 Mutation
  const updateMutation = useMutation({
    mutationFn: (data: UpdateCommentDto) =>
      updateComment(lpId, comment.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY });
      setIsEditing(false);
      setIsMenuOpen(false);
      console.log("DEBUG: 댓글 수정 성공, 목록 새로고침 완료");
    },
    onError: (error) => {
      console.error("ERROR: 댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다. 본인 댓글인지 확인해 주세요.");
    },
  });

  // 2. 댓글 삭제 Mutation
  const deleteMutation = useMutation({
    mutationFn: () => deleteComment(lpId, comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY });
      console.log("DEBUG: 댓글 삭제 성공, 목록 새로고침 완료");
    },
    onError: (error) => {
      console.error("ERROR: 댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다. 본인 댓글인지 확인해 주세요.");
    },
  });

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedContent.trim().length < 5) {
      alert("댓글은 5자 이상이어야 합니다.");
      return;
    }
    updateMutation.mutate({ content: editedContent.trim() });
  };

  const handleDeleteClick = () => {
    if (confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      deleteMutation.mutate();
    }
  };

  return (
    <div className="flex space-x-3 py-3 border-b border-gray-100 dark:border-gray-700 relative">
      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-semibold text-blue-600 dark:text-blue-300 flex-shrink-0">
        {authorName.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-gray-900 dark:text-white">
            {authorName}
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {comment.updatedAt && comment.updatedAt !== comment.createdAt
                ? `(수정됨) `
                : ""}{" "}
              {timeAgo}
            </span>

            {/* 본인이 작성한 댓글에만 메뉴 버튼 표시 */}
            {isMyComment && (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  disabled={
                    updateMutation.isPending || deleteMutation.isPending
                  }
                  aria-label="댓글 메뉴"
                >
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 2a2 2 0 104 0 2 2 0 00-4 0z" />
                  </svg>
                </button>

                {/* 수정/삭제 드롭다운 메뉴 */}
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-24 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-600">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      수정
                    </button>
                    <button
                      onClick={handleDeleteClick}
                      className="block w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 댓글 내용: 수정 모드 / 일반 모드 */}
        {isEditing ? (
          <form onSubmit={handleUpdateSubmit} className="space-y-2">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={2}
              className="w-full p-2 border border-blue-500 dark:border-blue-500 dark:bg-gray-900 dark:text-white rounded-lg resize-none focus:outline-none"
              disabled={updateMutation.isPending}
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditedContent(comment.content);
                }}
                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                disabled={updateMutation.isPending}
              >
                취소
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                disabled={
                  updateMutation.isPending || editedContent.trim().length < 5
                }
              >
                {updateMutation.isPending ? "수정 중..." : "저장"}
              </button>
            </div>
          </form>
        ) : (
          <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">
            {comment.content}
          </p>
        )}
      </div>
    </div>
  );
};
// ----------------------------------------------------

const LpDetailScreen = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const parsedLpId = lpid ? parseInt(lpid, 10) : undefined;
  const lpId = parsedLpId;

  const { accessToken, userId } = useAuth();
  const queryClient = useQueryClient();

  console.log("DEBUG: Parsed LP ID:", lpId, "lpid from URL:", lpid);

  // 상태 관리
  const [order, setOrder] = useState<SortOrder>("desc");
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");
  const observerTargetRef = useRef<HTMLDivElement>(null);

  // 1. Lp 상세 정보 쿼리
  const {
    data: lpData,
    isLoading: isLpLoading,
    isError: isLpError,
    refetch: refetchLp,
    error,
  } = useQuery({
    queryKey: ["lpDetail", lpId],
    queryFn: () => getLpDetail(lpId as number),
    enabled: lpId !== undefined,
    staleTime: 1000 * 60 * 5,
  });

  // 2. 댓글 무한 스크롤 쿼리 (useInfiniteQuery)
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchComments,
  } = useInfiniteQuery<CursorBasedResponse<Comment[]>>({
    queryKey: ["lpCommentsInfinite", lpId, order],
    queryFn: ({ pageParam = undefined }) =>
      getLpComments(lpId as number, {
        cursor: pageParam as number | undefined,
        limit: 10,
        order: order,
      }),
    getNextPageParam: (lastPage) => {
      // ✅ 수정: lastPage가 이미 CursorBasedResponse<Comment[]> 타입
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    enabled: lpId !== undefined,
    staleTime: 1000 * 60 * 2,
    initialPageParam: undefined,
  });

  // 3. 댓글 작성 Mutation
  const commentCreationMutation = useMutation({
    mutationFn: (data: CreateCommentDto) => createComment(lpId as number, data),
    onSuccess: () => {
      setCommentText("");
      // 🚨 목록 쿼리 무효화: order 변수 포함하도록 수정 (최신순/오래된순 쿼리 키 일치)
      queryClient.invalidateQueries({
        queryKey: ["lpCommentsInfinite", lpId, order],
      });
      console.log("DEBUG: 댓글 작성 성공, 목록 새로고침 완료");
    },
    onError: (error) => {
      console.error("ERROR: 댓글 작성 실패:", error);
      setCommentError("댓글 작성에 실패했습니다. 다시 시도해 주세요.");
    },
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = commentText.trim();
    if (trimmedText.length < 5) {
      setCommentError("댓글은 5자 이상이어야 합니다.");
      return;
    }
    if (!accessToken) {
      setCommentError("댓글 작성은 로그인 사용자만 가능합니다.");
      return;
    }
    setCommentError("");

    commentCreationMutation.mutate({ content: trimmedText });
  };

  // 무한 스크롤 옵저버 로직 (기존 유지)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const currentTarget = observerTargetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 댓글 데이터 추출 및 카운트 (방어적 접근 강화)
  const allComments: Comment[] = useMemo(() => {
    return commentsData
      ? commentsData.pages.flatMap(
          // 🚀 **핵심 수정**: page.data.data에서 실제 댓글 배열을 추출합니다.
          (page) => page.data?.data || []
        )
      : [];
  }, [commentsData]);
  const commentCount = allComments.length;

  // 🚨 404 오류 방지: LP 상세 정보 로딩/에러 처리
  if (lpId === undefined || isLpLoading) {
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <LpSkeleton />
      </div>
    );
  }

  // 에러 발생 시 (getLpDetail)
  if (isLpError) {
    console.error("ERROR: LP 상세 정보 로딩 실패:", error);
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <ErrorState
          message={
            error instanceof Error
              ? error.message
              : "LP 상세 정보를 불러올 수 없습니다."
          }
          onRetry={refetchLp}
          buttonText="다시 시도"
        />
      </div>
    );
  }

  // ✅ 수정: lpData가 바로 LpItem 타입
  const lp = lpData;
  if (!lp) {
    console.error("ERROR: LP 상세 정보 데이터 객체가 비어있습니다.");
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <ErrorState
          message="LP 상세 정보를 찾을 수 없습니다. (ID 문제 또는 데이터 없음)"
          onRetry={refetchLp}
          buttonText="다시 시도"
        />
      </div>
    );
  }

  // 🚨 수정: LP 작성자 이름도 nickname을 우선적으로 사용하도록 수정
  const lpAuthorName = lp.author?.nickname || lp.author?.name || "익명";

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-[calc(100vh-64px-48px)]">
      {/* ------------------------------------ */}
      {/* LP 상세 정보 UI */}
      {/* ------------------------------------ */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 break-words">
          {lp.title}
        </h1>
        <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {lpAuthorName}
          </span>
          <span>|</span>
          <span>{calculateTimeAgo(lp.createdAt)}</span>
        </div>

        <div className="mb-8">
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-full h-auto object-cover rounded-lg shadow-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://placehold.co/800x450/1f2937/ffffff?text=Image+Not+Found";
              target.onerror = null;
            }}
          />
        </div>

        <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-8">
          {lp.content}
        </p>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
          {lp.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300 rounded-full text-sm font-medium"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* ------------------------------------ */}
      {/* 댓글 영역 */}
      {/* ------------------------------------ */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
        {/* 댓글 헤더 */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Comments ({commentCount})
          </h2>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as SortOrder)}
            className="p-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="desc">최신순</option>
            <option value="asc">오래된순</option>
          </select>
        </div>

        {/* 🚀 댓글 작성란 UI (form) */}
        <form onSubmit={handleCommentSubmit} className="space-y-2">
          <div className="flex space-x-2 items-start">
            <textarea
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value);
                if (e.target.value.trim().length >= 5) setCommentError("");
              }}
              placeholder={
                accessToken
                  ? "댓글을 입력해주세요 (최소 5자)"
                  : "로그인 후 댓글을 작성할 수 있습니다."
              }
              rows={3}
              disabled={!accessToken || commentCreationMutation.isPending}
              className="flex-1 p-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg resize-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={
                !accessToken ||
                commentText.trim().length < 5 ||
                commentCreationMutation.isPending
              }
              className="h-10 px-4 py-2 mt-0.5 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-150 disabled:bg-gray-400"
            >
              {commentCreationMutation.isPending ? "작성 중..." : "작성"}
            </button>
          </div>
          {/* 유효성 안내 */}
          {commentError && (
            <p className="text-sm text-red-500">{commentError}</p>
          )}
        </form>

        {/* 댓글 목록 */}
        <div className="space-y-4">
          {/* 초기 로딩 */}
          {isCommentsLoading && allComments.length === 0 && (
            <CommentSkeleton count={3} />
          )}

          {/* 에러 상태 처리 */}
          {isCommentsError && (
            <ErrorState
              message="댓글을 불러오는 데 실패했습니다."
              onRetry={refetchComments}
              buttonText="댓글 다시 불러오기"
            />
          )}

          {/* 댓글 목록 매핑 */}
          {!isCommentsError &&
            allComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                currentUserId={userId} // useAuth에서 가져온 userId 전달
                lpId={lpId as number} // lpId 전달
              />
            ))}

          {/* 추가 로딩 */}
          {isFetchingNextPage && <CommentSkeleton count={2} />}

          {/* 무한 스크롤 트리거 요소 */}
          {hasNextPage && <div ref={observerTargetRef} className="h-1"></div>}

          {/* 댓글이 없을 경우 */}
          {commentCount === 0 && !isCommentsLoading && !isCommentsError && (
            <div className="text-center p-4 text-gray-500 dark:text-gray-400">
              아직 댓글이 없습니다. 첫 댓글을 남겨주세요!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LpDetailScreen;
