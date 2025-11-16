import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Record from "./components/Record";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Comments from "./components/Comments";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import { useLPDetail } from "../../hooks/useLPDetail";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { lpAPI } from "../../apis/lp";

type TagType = { id: number; name: string };
type LPWithTags = { tags?: TagType[] };

const LPDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const [heart, setHeart] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const isCheckingAuth = useAuthGuard();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editThumbnail, setEditThumbnail] = useState("");
  const [editTags, setEditTags] = useState("");
  const currentUserId = Number(localStorage.getItem("userId") || "0");

  const lpIdNumber = lpid && !isNaN(Number(lpid)) ? parseInt(lpid, 10) : null;

  const {
    data: lp,
    isLoading,
    isError,
    error,
    refetch,
  } = useLPDetail(lpIdNumber, !isCheckingAuth);

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!lpIdNumber) throw new Error("잘못된 LP ID");
      const payload = {
        title: editTitle.trim(),
        content: editContent.trim(),
        thumbnail: editThumbnail.trim() ? editThumbnail.trim() : undefined,
        tags: editTags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t.length > 0),
      };
      if (!payload.title || !payload.content) {
        throw new Error("제목과 내용은 필수입니다.");
      }
      const normalized = {
        ...payload,
        tags:
          payload.tags && payload.tags.length > 0 ? payload.tags : undefined,
      };
      return lpAPI.updateLP(lpIdNumber, normalized);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail", lpIdNumber] });
      setIsEditing(false);
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof Error ? err.message : "LP 수정에 실패했습니다.";
      alert(msg);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!lpIdNumber) throw new Error("잘못된 LP ID");
      return lpAPI.deleteLP(lpIdNumber);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      navigate("/", { replace: true });
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof Error ? err.message : "LP 삭제에 실패했습니다.";
      alert(msg);
    },
  });

  // 좋아요 낙관적 업데이트
  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!lpIdNumber) throw new Error("잘못된 LP ID");
      return lpAPI.toggleLike(lpIdNumber);
    },
    onMutate: async () => {
      if (!lpIdNumber) return;
      await queryClient.cancelQueries({ queryKey: ["lpDetail", lpIdNumber] });
      const previous = queryClient.getQueryData<any>(["lpDetail", lpIdNumber]);

      if (previous?.data) {
        const prevDetail = previous.data;
        const prevLikes: Array<{ id: number; userId: number; lpId: number }> =
          Array.isArray(prevDetail.likes) ? prevDetail.likes : [];
        const hasLiked = prevLikes.some((l) => l.userId === currentUserId);
        const nextLikes = hasLiked
          ? prevLikes.filter((l) => l.userId !== currentUserId)
          : [...prevLikes, { id: -1, userId: currentUserId, lpId: prevDetail.id }];

        queryClient.setQueryData(["lpDetail", lpIdNumber], {
          ...previous,
          data: {
            ...prevDetail,
            likes: nextLikes,
          },
        });

        // 로컬 카운터/하트도 즉시 반영
        setHeart(!hasLiked);
        setLikeCount((c) => (hasLiked ? Math.max(0, c - 1) : c + 1));
      }

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (!lpIdNumber) return;
      if (ctx?.previous) {
        queryClient.setQueryData(["lpDetail", lpIdNumber], ctx.previous);
      }
      // 로컬 상태도 원복 필요 시 상세 refetch에서 맞춰짐
    },
    onSettled: () => {
      if (!lpIdNumber) return;
      queryClient.invalidateQueries({ queryKey: ["lpDetail", lpIdNumber] });
    },
  });

  useEffect(() => {
    if (lp) {
      setLikeCount(lp.likes?.length || 0);
      setEditTitle(lp.title);
      setEditContent(lp.content);
      setEditThumbnail(lp.thumbnail ?? "");
      const tags = (lp as LPWithTags).tags;
      setEditTags(
        tags && tags.length ? tags.map((t) => t.name).join(", ") : ""
      );
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
    if (!likeMutation.isPending) {
      likeMutation.mutate();
    }
  };

  const startEdit = () => setIsEditing(true);
  const cancelEdit = () => {
    if (!lp) return setIsEditing(false);
    setEditTitle(lp.title);
    setEditContent(lp.content);
    setEditThumbnail(lp.thumbnail ?? "");
    const tags = (lp as LPWithTags).tags;
    setEditTags(tags && tags.length ? tags.map((t) => t.name).join(", ") : "");
    setIsEditing(false);
  };

  // deleteMutation 훅은 상단에서 선언됨

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
              {lp.author?.id === currentUserId && (
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <button
                    onClick={startEdit}
                    className="text-gray-400 hover:text-white transition"
                  >
                    <FaPen className="text-base sm:text-lg" />
                  </button>
                  <button
                    onClick={() => {
                      if (deleteMutation.isPending) return;
                      const ok = window.confirm("이 LP를 삭제하시겠습니까?");
                      if (ok) deleteMutation.mutate();
                    }}
                    className="text-gray-400 transition hover:text-red-500 disabled:opacity-60"
                    disabled={deleteMutation.isPending}
                  >
                    <FaTrash className="text-base sm:text-lg" />
                  </button>
                </div>
              )}
            </div>

            {/* 제목/편집 */}
            <div className="mb-6 sm:mb-8">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                    placeholder="제목"
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                    rows={6}
                    placeholder="내용"
                  />
                  <input
                    type="url"
                    value={editThumbnail}
                    onChange={(e) => setEditThumbnail(e.target.value)}
                    className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                    placeholder="썸네일 URL (선택)"
                  />
                  <input
                    type="text"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                    placeholder="태그를 , 로 구분 (선택)"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={cancelEdit}
                      type="button"
                      className="rounded-lg border border-gray-600 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => updateMutation.mutate()}
                      disabled={updateMutation.isPending}
                      type="button"
                      className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 disabled:opacity-60"
                    >
                      {updateMutation.isPending ? "저장 중..." : "저장"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <h1 className="text-white text-2xl sm:text-3xl font-bold wrap-break-word">
                    {lp.title}
                  </h1>
                  {lp.author?.id === currentUserId && (
                    <button
                      onClick={startEdit}
                      className="rounded-lg border border-gray-600 px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-800"
                    >
                      수정
                    </button>
                  )}
                </div>
              )}
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
            {!isEditing && (
              <div className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-700">
                <p className="text-gray-300 text-sm leading-relaxed p-4 sm:p-6 wrap-break-word">
                  {lp.content}
                </p>
              </div>
            )}

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
