// LpDetailScreen.tsx

import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../apis/lp";
import { calculateTimeAgo } from "../utils/date";
import { useAuth } from "../context/AuthContext";
import type { LpItem } from "../types/lp";
// LpListScreen에서 LpSkeleton, ErrorState를 named export로 가져옴
import { LpSkeleton, ErrorState } from "./LpListScreen";

// ⭐️ ⭐⭐ 오류 방지를 위한 임포트 방식 수정 ⭐⭐⭐
// 1. 모듈 전체를 가져옵니다. (ex: import * as Module)
import * as CommentModule from "../components/CommentSkeleton";
// 2. 가져온 모듈에서 default 속성을 추출하여 CommentSkeleton 변수에 할당합니다.
const CommentSkeleton =
  CommentModule.default || (CommentModule as any).CommentSkeleton;

const LpDetailScreen = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const lpId = lpid ? parseInt(lpid, 10) : undefined;
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const {
    data: response,
    isLoading,
    isError,
    refetch,
    error, // ErrorState에 에러 객체를 전달하기 위해 추가
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

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <LpSkeleton count={1} detail={true} />
      </div>
    );
  }

  if (isError || !response || !response.data) {
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <ErrorState
          message="LP 상세 정보를 불러오는 데 실패했습니다."
          onRetry={refetch}
          error={error as Error} // 에러 디버깅을 위해 에러 객체 전달 (선택 사항)
        />
      </div>
    );
  }

  const lpItem: LpItem | undefined = response.data;
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
              {/* nickname이 null/undefined일 경우를 안전하게 처리 */}
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            댓글 ({lpItem.comments?.length || 0})
          </h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-500 dark:text-gray-400 text-sm">
            댓글 입력 기능 구현 예정...
          </div>
          <div className="space-y-4">
            <CommentSkeleton count={3} />
            {/* 실제 댓글 목록은 여기에 매핑됩니다. */}
            {/* {lpItem.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpDetailScreen;
