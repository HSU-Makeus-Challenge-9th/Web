import { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";

import { MoreVertical } from "lucide-react";
import { PAGINATION_ORDER } from "../../enums/common";
import useGetInfiniteLpComments from "../../hooks/queries/useGetInfiniteLpComments";
import { useCreateLpComment } from "../../hooks/queries/useCreateLpComment";
import {
  useDeleteComment,
  usePatchComment,
} from "../../hooks/queries/usePatchDeleteComment";
import LpCommentsSkeletonList from "./LpCommentsSkeletonList";

const LpCommentsSection = ({ lpId }: { lpId: number }) => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useGetInfiniteLpComments(lpId, order);

  const createComment = useCreateLpComment(lpId);
  const updateComment = usePatchComment(lpId);
  const deleteComment = useDeleteComment(lpId);

  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const comments = data?.pages.flatMap((page) => page.data.data) ?? [];

  const handleSubmit = () => {
    if (!comment.trim()) return alert("댓글을 입력해주세요.");
    createComment.mutate(comment, {
      onSuccess: () => setComment(""),
    });
  };

  const handleEdit = (commentId: number, content: string) => {
    setEditingId(commentId);
    setEditContent(content);
    setMenuOpenId(null);
  };

  const handleUpdate = (commentId: number) => {
    if (!editContent.trim()) return;
    updateComment.mutate(
      { commentId, content: editContent },
      {
        onSuccess: () => setEditingId(null),
      }
    );
  };

  const handleDelete = (commentId: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteComment.mutate(commentId);
    }
  };

  return (
    <div className="bg-neutral-800 rounded-2xl shadow-lg p-6 w-full max-w-2xl mt-10">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">댓글</h2>

        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-sm border text-sm ${
              order === PAGINATION_ORDER.asc
                ? "bg-white text-black"
                : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
            }`}
            onClick={() => setOrder(PAGINATION_ORDER.asc)}
          >
            오래된순
          </button>
          <button
            className={`px-3 py-1 rounded-sm border text-sm ${
              order === PAGINATION_ORDER.desc
                ? "bg-white text-black"
                : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
            }`}
            onClick={() => setOrder(PAGINATION_ORDER.desc)}
          >
            최신순
          </button>
        </div>
      </div>

      {/* 댓글 입력창 */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력해주세요"
          className="flex-1 bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
        />
        <button
          onClick={handleSubmit}
          disabled={createComment.isPending}
          className="px-4 py-2 rounded-md text-sm bg-neutral-600 text-white hover:bg-pink-600 transition-colors disabled:bg-neutral-700 disabled:cursor-not-allowed"
        >
          {createComment.isPending ? "작성 중..." : "작성"}
        </button>
      </div>

      {/* 댓글 목록 */}
      <div className="flex flex-col gap-4 mb-6">
        {isPending ? (
          <LpCommentsSkeletonList count={5} />
        ) : comments.length > 0 ? (
          comments.map((c) => (
            <div key={c.id} className="relative flex items-start gap-3 pb-3">
              <img
                src={
                  c.author?.avatar ??
                  `https://api.dicebear.com/8.x/thumbs/svg?seed=${c.author?.name}`
                }
                alt={c.author?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">{c.author?.name}</p>

                {editingId === c.id ? (
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="flex-1 bg-neutral-900 border border-neutral-700 rounded-md px-2 py-1 text-sm text-white focus:outline-none focus:border-pink-500"
                    />
                    <button
                      onClick={() => handleUpdate(c.id)}
                      className="text-pink-500 text-sm hover:underline"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-400 text-sm hover:underline"
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-300 text-sm">{c.content}</p>
                )}
              </div>

              {/* ⋮ 메뉴 버튼 */}
              <div className="relative">
                <button
                  onClick={() =>
                    setMenuOpenId(menuOpenId === c.id ? null : c.id)
                  }
                  className="text-gray-400 hover:text-gray-200"
                >
                  <MoreVertical size={16} />
                </button>

                {menuOpenId === c.id && (
                  <div className="absolute right-0 mt-2 w-24 bg-neutral-900 border border-gray-700 rounded-md shadow-lg z-10">
                    <button
                      onClick={() => handleEdit(c.id, c.content)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-neutral-700"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-neutral-700"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-3">댓글이 없습니다.</p>
        )}

        <div ref={ref} className="h-4" />
      </div>

      {isFetchingNextPage && <LpCommentsSkeletonList count={3} />}
    </div>
  );
};

export default LpCommentsSection;
