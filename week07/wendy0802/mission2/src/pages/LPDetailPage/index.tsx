import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import Record from "./components/Record";
import Comments from "./components/Comments";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import { useLPDetail } from "../../hooks/useLPDetail";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { lpAPI } from "../../apis/lp";
import AuthorHeader from "./components/AuthorHeader";
import TitleEditor from "./components/TitleEditor";
import TagList from "./components/TagList";
import LikeBar from "./components/LikeBar";

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
    if (heart) {
      setHeart(false);
      setLikeCount((prev) => Math.max(0, prev - 1));
    } else {
      setHeart(true);
      setLikeCount((prev) => prev + 1);
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
            <AuthorHeader
              author={lp.author}
              createdAt={lp.createdAt}
              currentUserId={currentUserId}
              onEdit={startEdit}
              onConfirmDelete={() => {
                if (deleteMutation.isPending) return;
                const ok = window.confirm("이 LP를 삭제하시겠습니까?");
                if (ok) deleteMutation.mutate();
              }}
              deletePending={deleteMutation.isPending}
              getTimeAgo={getTimeAgo}
            />

            {/* 제목/편집 */}
            <TitleEditor
              isEditing={isEditing}
              title={editTitle}
              content={editContent}
              thumbnail={editThumbnail}
              tags={editTags}
              canEdit={lp.author?.id === currentUserId}
              onTitleChange={setEditTitle}
              onContentChange={setEditContent}
              onThumbChange={setEditThumbnail}
              onTagsChange={setEditTags}
              onSave={() => updateMutation.mutate()}
              onCancel={cancelEdit}
              onStartEdit={startEdit}
              saving={updateMutation.isPending}
              displayTitle={lp.title}
            />

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
            <TagList
              tags={
                (lp as unknown as { tags?: { id: number; name: string }[] })
                  .tags
              }
            />

            {/* 좋아요 */}
            <LikeBar
              liked={heart}
              likeCount={likeCount}
              onToggle={handleHeart}
            />

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
