import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInfiniteComments } from "../../../hooks/useInfiniteComments";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../../../apis/comments";
import CommentSkeleton from "./CommentSkeleton";

interface CommentsProps {
  lpId: number;
}

const Comments = ({ lpId }: CommentsProps) => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [commentText, setCommentText] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const queryClient = useQueryClient();
  const currentUserId = localStorage.getItem("userId")
    ? Number(localStorage.getItem("userId"))
    : null;

  const { data, isLoading, isError, error } = useInfiniteComments(lpId, order);

  const comments = data?.pages.flatMap((page) => page.data) ?? [];

  const { mutateAsync: writeComment, isPending } = useMutation({
    mutationFn: (payload: { lpId: number; content: string }) =>
      createComment(payload.lpId, payload.content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lpComments", lpId, order],
      });
      setCommentText("");
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const { mutateAsync: editComment, isPending: isEditing } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lpComments", lpId, order],
      });
      setEditingId(null);
      setEditText("");
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const { mutateAsync: removeComment, isPending: isDeleting } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lpComments", lpId, order],
      });
      setOpenMenuId(null);
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const handleSubmit = async () => {
    if (!commentText.trim()) return;
    await writeComment({ lpId, content: commentText.trim() });
  };

  const handleEditSave = async (commentId: number) => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    await editComment({ lpId, commentId, content: trimmed });
  };

  const handleDelete = async (commentId: number) => {
    const shouldDelete = window.confirm("댓글을 삭제하시겠습니까?");
    if (!shouldDelete) return;
    await removeComment({ lpId, commentId });
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
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              type="text"
              placeholder="댓글을 입력하세요."
              className="flex-1 bg-gray-800 border border-pink-500 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <button
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-4 py-2 rounded-lg transition text-sm shrink-0"
              onClick={handleSubmit}
              disabled={isPending}
            >
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
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 입력하세요."
            className="flex-1 bg-gray-800 border border-pink-500 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-4 py-2 rounded-lg transition text-sm shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "작성 중..." : "작성"}
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
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">
                        {comment.author.name}
                      </span>
                      <span className="text-gray-500">|</span>
                      <span className="text-gray-400 text-xs">
                        {getTimeAgo(comment.createdAt)}
                      </span>
                      {currentUserId &&
                        comment.author &&
                        comment.author.id === currentUserId && (
                          <div className="relative ml-auto">
                            <button
                              type="button"
                              className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-700 hover:text-white"
                              onClick={() =>
                                setOpenMenuId((prev) =>
                                  prev === comment.id ? null : comment.id
                                )
                              }
                            >
                              ⋯
                            </button>
                            {openMenuId === comment.id && (
                              <div className="absolute right-0 z-10 mt-2 w-28 rounded-lg border border-gray-700 bg-gray-900 p-1 shadow-lg">
                                <button
                                  type="button"
                                  className="w-full rounded-md px-2 py-1 text-left text-sm text-gray-200 hover:bg-gray-800"
                                  onClick={() => {
                                    setEditingId(comment.id);
                                    setEditText(comment.content);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  수정
                                </button>
                                <button
                                  type="button"
                                  disabled={isDeleting}
                                  className="w-full rounded-md px-2 py-1 text-left text-sm text-red-400 hover:bg-gray-800 disabled:opacity-60"
                                  onClick={() => handleDelete(comment.id)}
                                >
                                  삭제
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                    </div>
                    {editingId === comment.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-gray-100 placeholder:text-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                          rows={3}
                        />
                        <div className="flex justify-end gap-2 text-sm">
                          <button
                            type="button"
                            className="rounded-lg border border-gray-600 px-3 py-1 text-gray-300 transition hover:bg-gray-800"
                            onClick={() => {
                              setEditingId(null);
                              setEditText("");
                            }}
                          >
                            취소
                          </button>
                          <button
                            type="button"
                            className="rounded-lg bg-pink-500 px-3 py-1 text-white transition hover:bg-pink-600 disabled:opacity-60"
                            disabled={isEditing}
                            onClick={() => handleEditSave(comment.id)}
                          >
                            {isEditing ? "저장 중..." : "저장"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-300 text-sm leading-relaxed wrap-break-word">
                        {comment.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
