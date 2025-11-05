// LpDetailScreen.tsx 파일 (순수 텍스트)

import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// useInfiniteQuery 임포트
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getLpDetail, getLpComments } from "../apis/lp";
import { calculateTimeAgo } from "../utils/date";
import { useAuth } from "../context/AuthContext";
// Comment, ResponseCommentListDto, ResponseDto 타입을 types/lp.ts에서 가져온다고 가정
import type {
  LpItem,
  Comment,
  ResponseCommentListDto,
  ResponseDto,
} from "../types/lp";
import { LpSkeleton, ErrorState } from "./LpListScreen";
import CommentSkeleton from "../components/CommentSkeleton";

// ----------------------------------------------------
// CommentItem 컴포넌트 (임시 목업)
// ----------------------------------------------------
interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const authorName = comment.author?.name || comment.author?.nickname || "익명";
  const timeAgo = calculateTimeAgo(comment.createdAt);

  return (
    <div className="flex space-x-3 py-3 border-b border-gray-100 dark:border-gray-700">
      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-semibold text-blue-600 dark:text-blue-300 flex-shrink-0">
        {authorName.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-gray-900 dark:text-white">
            {authorName}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {timeAgo}
          </span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">
          {comment.content}
        </p>
      </div>
    </div>
  );
};
// ----------------------------------------------------

// API 응답 구조 헬퍼 타입
type CommentPage = ResponseDto<ResponseCommentListDto>;
type SortOrder = "asc" | "desc";

const LpDetailScreen = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const lpId = lpid ? parseInt(lpid, 10) : undefined;
  const { accessToken } = useAuth();
  console.log(
    "Current Access Token Status:",
    accessToken ? "Present" : "Missing"
  );
  const navigate = useNavigate();

  const [order, setOrder] = useState<SortOrder>("desc");
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");

  const observerTargetRef = useRef<HTMLDivElement>(null);

  // 1. LP 상세 정보 쿼리
  const {
    data: lpResponse,
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["lp", lpId],
    queryFn: () => {
      if (!lpId) {
        throw new Error("LP ID가 유효하지 않습니다.");
      }
      return getLpDetail(lpId);
    },
    enabled: !!lpId,
    staleTime: 1000 * 60 * 5,
  });

  // 2. 댓글 목록 무한 쿼리 (useInfiniteQuery)
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchComments,
  } = useInfiniteQuery<CommentPage>({
    queryKey: ["lpCommentsInfinite", lpId, order],
    queryFn: ({ pageParam = 0 }) => {
      if (!lpId) {
        return Promise.reject(new Error("LP ID가 유효하지 않습니다."));
      }
      const limit = 10;
      return getLpComments(lpId, accessToken, {
        limit,
        cursor: pageParam,
        order,
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data?.hasNext) {
        return lastPage.data.nextCursor;
      }
      return undefined;
    },
    initialPageParam: 0,
    enabled: !!lpId,
    staleTime: 1000 * 60 * 1,
  });

  // 무한 스크롤 Intersection Observer 로직
  useEffect(() => {
    if (!observerTargetRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    observer.observe(observerTargetRef.current);

    return () => {
      if (observerTargetRef.current) {
        observer.unobserve(observerTargetRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 정렬 변경 핸들러
  const handleSortChange = (newOrder: SortOrder) => {
    if (order !== newOrder) {
      setOrder(newOrder);
      // queryKey 변경으로 인해 useInfiniteQuery가 자동으로 리로드됩니다.
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim().length < 5) {
      setCommentError("댓글은 5자 이상이어야 합니다.");
      return;
    }
    if (!accessToken) {
      setCommentError("로그인이 필요합니다.");
      return;
    }
    setCommentError("");

    // TODO: 댓글 작성 API 호출 로직 구현
    console.log(`[API 호출 예정] LP ID: ${lpId}, 내용: ${commentText}`);
    // 성공 후: setCommentText(''); refetchComments();
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <LpSkeleton count={1} detail={true} />
      </div>
    );
  }

  if (isError || !lpResponse || !lpResponse.data) {
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <ErrorState
          message="LP 상세 정보를 불러오는 데 실패했습니다."
          onRetry={refetch}
          error={error as Error}
        />
      </div>
    );
  }

  const lpItem = lpResponse.data;
  if (!lpItem) {
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <ErrorState
          message="요청하신 LP 정보를 찾을 수 없습니다."
          onRetry={() => navigate("/")}
          buttonText="메인으로 돌아가기"
        />
      </div>
    );
  }

  // 댓글 데이터 추출
  const allComments: Comment[] = commentsData
    ? commentsData.pages.flatMap((page) => (page.data?.data as Comment[]) || [])
    : [];
  const commentCount = allComments.length;

  const author = lpItem.author;
  const isAuthor = accessToken && author && author.id === lpItem.authorId;
  const timeAgo = calculateTimeAgo(lpItem.createdAt);

  const handleLike = () => {
    alert("좋아요 기능 구현 예정");
  };
  const handleEdit = () => {
    alert("수정 기능 구현 예정");
  };
  const handleDelete = () => {
    if (confirm("정말로 이 LP를 삭제하시겠습니까?")) {
      alert("삭제 기능 구현 예정");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-[calc(100vh-64px-48px)]">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-8">
        <header className="flex items-start justify-between pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 break-words">
              {lpItem.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>By {author?.nickname || "알 수 없음"}</span>
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
          </div>
          <div className="flex-shrink-0 ml-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-lg font-bold text-gray-800 dark:text-gray-200">
              {author?.nickname ? author.nickname.charAt(0).toUpperCase() : "U"}
            </div>
          </div>
        </header>

        <section className="space-y-6">
          <div className="relative aspect-square md:aspect-video w-full rounded-lg overflow-hidden bg-gray-700">
            <img
              src={lpItem.thumbnail}
              alt={lpItem.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://placehold.co/800x450/1f2937/ffffff?text=Image+Not+Found";
                target.onerror = null;
              }}
            />
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {lpItem.description}
          </p>
        </section>

        <footer className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="flex items-center p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition duration-150"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
              <span className="ml-2 font-semibold">
                {lpItem.likes?.length || 0}
              </span>
            </button>
          </div>
          {isAuthor && (
            <div className="space-x-2">
              <button
                onClick={handleEdit}
                className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 dark:text-blue-300 dark:bg-blue-900/50 dark:hover:bg-blue-900 transition duration-150"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200 dark:text-red-300 dark:bg-red-900/50 dark:hover:bg-red-900 transition duration-150"
              >
                삭제
              </button>
            </div>
          )}
        </footer>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              댓글 ({commentCount})
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => handleSortChange("desc")}
                className={`px-3 py-1 text-sm rounded-lg font-semibold transition-colors ${order === "desc" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}
              >
                최신순
              </button>
              <button
                onClick={() => handleSortChange("asc")}
                className={`px-3 py-1 text-sm rounded-lg font-semibold transition-colors ${order === "asc" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}
              >
                오래된순
              </button>
            </div>
          </div>

          {/* 댓글 작성란 UI */}
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
                disabled={!accessToken}
                className="flex-1 p-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg resize-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!accessToken || commentText.trim().length < 5}
                className="h-10 px-4 py-2 mt-0.5 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-150 disabled:bg-gray-400"
              >
                작성
              </button>
            </div>
            {/* 유효성 안내 */}
            {commentError && (
              <p className="text-sm text-red-500">{commentError}</p>
            )}
          </form>

          <div className="space-y-4">
            {/* 초기 로딩 (상단 스켈레톤) */}
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
                <CommentItem key={comment.id} comment={comment} />
              ))}

            {/* ⭐ 추가 로딩 (하단 스켈레톤) */}
            {isFetchingNextPage && <CommentSkeleton count={2} />}

            {/* ⭐ 무한 스크롤 트리거 요소 */}
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
    </div>
  );
};

export default LpDetailScreen;
