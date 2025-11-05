import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Record from "./components/Record";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Comments from "./components/Comments";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import { useLPDetail } from "../../hooks/useLPDetail";

// 타입은 훅 내부/응답 타입을 따르며, 로컬 인터페이스는 제거

const LPDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const [heart, setHeart] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const isCheckingAuth = useAuthGuard();

  const lpIdNumber = lpid && !isNaN(Number(lpid)) ? parseInt(lpid, 10) : null;

  const {
    data: lp,
    isLoading,
    isError,
    error,
    refetch,
  } = useLPDetail(lpIdNumber, !isCheckingAuth);

  useEffect(() => {
    if (lp) {
      setLikeCount(lp.likes?.length || 0);
    }
  }, [lp]);

  if (isCheckingAuth) {
    return null;
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="bg-black min-h-screen pt-16 pb-20">
          <div className="max-w-2xl mx-auto px-4 py-4 sm:py-8">
            <div className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-2xl animate-pulse">
              <div className="h-10 bg-gray-700 rounded mb-4"></div>
              <div className="h-8 bg-gray-700 rounded mb-8 w-3/4"></div>
              <div className="flex justify-center mb-8">
                <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gray-700"></div>
              </div>
              <div className="h-24 bg-gray-700 rounded mb-6"></div>
              <div className="flex gap-2 mb-6">
                <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
                <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
              </div>
              <div className="h-6 w-16 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isError || !lp) {
    return (
      <>
        <Header />
        <div className="bg-black min-h-screen pt-16 pb-20">
          <div className="max-w-2xl mx-auto px-4 py-4 sm:py-8">
            <div className="text-center py-20">
              <div className="text-red-500 mb-4 text-base sm:text-lg">
                {error instanceof Error
                  ? error.message
                  : "LP 상세 정보를 찾을 수 없습니다."}
              </div>
              <button
                onClick={() => refetch()}
                className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                다시 시도
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const handleHeart = () => {
    if (heart) {
      setHeart(false);
      setLikeCount((prev) => Math.max(0, prev - 1));
    } else {
      setHeart(true);
      setLikeCount((prev) => prev + 1);
    }
  };

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

  return (
    <>
      <Header />
      <div className="bg-black min-h-screen pt-16 pb-20">
        <div className="max-w-2xl mx-auto px-4 py-4 sm:py-8">
          <div className="bg-gray-900 rounded-xl p-4 sm:p-6 shadow-2xl">
            {/* 작성자 정보 및 업로드일 섹션 */}
            <div className="flex items-start justify-between mb-4 sm:mb-6 pb-4 border-b border-gray-700">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden shrink-0">
                  {lp.author.avatar ? (
                    <img
                      src={lp.author.avatar}
                      alt={lp.author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-xs sm:text-sm">👤</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-white font-semibold text-sm sm:text-base truncate">
                    {lp.author.name}
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    {getTimeAgo(lp.createdAt)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button className="text-gray-400 hover:text-white transition">
                  <FaPen className="text-base sm:text-lg" />
                </button>
                <button className="text-gray-400 hover:text-red-500 transition">
                  <FaTrash className="text-base sm:text-lg" />
                </button>
              </div>
            </div>

            {/* 제목 */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-white text-2xl sm:text-3xl font-bold wrap-break-word">
                {lp.title}
              </h1>
            </div>

            {/* 썸네일(레코드) */}
            <div className="mb-6 sm:mb-8">
              <div className="flex justify-center bg-gray-800 rounded-sm p-4 sm:p-6 shadow-xl max-w-md mx-auto">
                <Record
                  thumbnail={lp.thumbnail}
                  title={lp.title}
                  lpId={lp.id}
                />
              </div>
            </div>

            {/* 본문 */}
            <div className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-700">
              <p className="text-gray-300 text-sm leading-relaxed p-4 sm:p-6 wrap-break-word">
                {lp.content}
              </p>
            </div>

            {/* 태그 */}
            {(() => {
              type Tag = { id: number; name: string };
              type WithTags = { tags?: Tag[] };
              const tags = (lp as unknown as WithTags).tags;
              return tags && tags.length > 0 ? (
                <div className="mb-4 sm:mb-6">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag: Tag) => (
                      <span
                        key={tag.id}
                        className="px-2 sm:px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full hover:bg-gray-600 transition cursor-pointer"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}

            {/* 좋아요 */}
            <div className="flex items-center mb-6">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleHeart}
              >
                {heart ? (
                  <AiFillHeart className="text-pink-500 text-xl sm:text-2xl transition-all hover:scale-110" />
                ) : (
                  <AiOutlineHeart className="text-pink-500 text-xl sm:text-2xl transition-all hover:scale-110" />
                )}
                <span className="text-white text-base sm:text-lg">
                  {likeCount}
                </span>
              </div>
            </div>

            {/* 댓글 */}
            <div className="border-t border-gray-700 pt-6">
              <Comments lpId={lp.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LPDetailPage;
