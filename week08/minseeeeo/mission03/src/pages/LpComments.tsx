import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import useGetInfiniteLpComments from "../hooks/queries/useGetInfiniteLpComments";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import LpCommentSkeletonList from "../components/lp/LpCommentSkeletonList";
import OrderButton from "../components/common/OrderButton";
import usePostLpComment from "../hooks/queries/usePostLpComment";
import usePatchLpComment from "../hooks/queries/usePatchLpComment";
import useDeleteLpComment from "../hooks/queries/useDeleteLpComment";

const LpComments = () => {
  const { id } = useParams();
  const lpId = id ? parseInt(id) : 0;
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [commentText, setCommentText] = useState("");
  const { mutate: postMutate } = usePostLpComment(lpId);
  const [openCommentId, setOpenCommentId] = useState<number | null>(null);
  const { mutate: patchMutate } = usePatchLpComment();
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const { mutate: deleteMutate } = useDeleteLpComment();

  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
    isFetchingNextPage,
  } = useGetInfiniteLpComments(lpId, order);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const handleAddCommentClick = useCallback(() => {
    postMutate(commentText, {
      onSuccess: () => {
        setCommentText("");
      },
      onError: () => {
        alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
      },
    });
  }, [commentText, postMutate]);

  const handleEditClick = useCallback(
    (commentId: number, currentContent: string) => {
      setEditingCommentId(commentId);
      setEditText(currentContent);
      setOpenCommentId(null); // 툴팁 닫기
    },
    []
  );

  const handleSaveEdit = useCallback(
    (commentId: number) => {
      if (!editText.trim()) {
        alert("댓글 내용을 입력해주세요.");
        return;
      }

      patchMutate(
        {
          lpId,
          commentId,
          content: editText,
        },
        {
          onSuccess: () => {
            setEditingCommentId(null);
            setEditText("");
          },
          onError: () => {
            alert("댓글 수정에 실패했습니다. 다시 시도해주세요.");
          },
        }
      );
    },
    [editText, lpId, patchMutate]
  );

  const handleCancelEdit = useCallback(() => {
    setEditingCommentId(null);
    setEditText("");
  }, []);

  const handleDeleteClick = useCallback(
    (lpId: number, commentId: number) => {
      deleteMutate(
        { lpId, commentId },
        {
          onSuccess: () => {
            alert("댓글이 삭제되었습니다.");
          },
          onError: () => {
            alert("댓글 삭제도중 문제가 발생하였습니다...");
          },
        }
      );
    },
    [deleteMutate]
  );

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className="bg-gray-900 w-full text-white min-h-screen">
      {/* 헤더 */}
      <div className="bg-gray-800 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">댓글</h2>
          <OrderButton order={order} setOrder={setOrder} />
        </div>

        {/* 댓글 입력창 */}
        <form className="flex gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 입력해주세요"
            className="flex-1 bg-gray-700 text-white rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            type="submit"
            disabled={commentText.trim().length === 0}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              commentText.trim().length === 0
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-pink-500 text-white hover:bg-pink-600"
            }`}
            onClick={handleAddCommentClick}
          >
            작성
          </button>
        </form>
      </div>

      {/* 댓글 목록 */}
      <div className="p-4">
        {isPending ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {comments?.pages
                .flatMap((page) => page.data.data)
                .map((comment) => (
                  <div
                    key={comment.id}
                    className="flex gap-3 py-3 border-b border-gray-800 last:border-0"
                  >
                    {/* 아바타 */}
                    <div className="flex-shrink-0">
                      {comment.author.avatar ? (
                        <img
                          src={comment.author.avatar}
                          alt={comment.author.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                          {comment.author.name[0]}
                        </div>
                      )}
                    </div>

                    {/* 댓글 내용 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">
                          {comment.author.name}
                        </span>
                        <div className="relative">
                          <button className="text-gray-400 hover:text-white">
                            <MoreVertical
                              size={16}
                              onClick={() =>
                                setOpenCommentId(
                                  openCommentId === comment.id
                                    ? null
                                    : comment.id
                                )
                              }
                            />
                          </button>
                          {openCommentId === comment.id && (
                            <div className="absolute top-full right-0 mt-1 flex items-center gap-3 bg-gray-800 px-3 py-2 rounded-md shadow-lg z-50 whitespace-nowrap">
                              <button
                                className="hover:text-pink-500 transition-colors"
                                onClick={() =>
                                  handleEditClick(comment.id, comment.content)
                                }
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                className="hover:text-pink-500 transition-colors"
                                onClick={() =>
                                  handleDeleteClick(lpId, comment.id)
                                }
                              >
                                <Trash size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {editingCommentId === comment.id ? (
                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="flex-1 bg-gray-700 text-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveEdit(comment.id)}
                            className="px-3 py-1 bg-pink-500 text-white rounded text-sm hover:bg-pink-600 transition-colors"
                          >
                            저장
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-500 transition-colors"
                          >
                            취소
                          </button>
                        </div>
                      ) : (
                        <p className="text-gray-300 text-sm break-words">
                          {comment.content}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            <div ref={ref} className="flex justify-center py-4">
              {isFetchingNextPage && <LpCommentSkeletonList count={6} />}
              {!hasNextPage && comments && (
                <p className="text-gray-500 text-sm">페이지 끝</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LpComments;
