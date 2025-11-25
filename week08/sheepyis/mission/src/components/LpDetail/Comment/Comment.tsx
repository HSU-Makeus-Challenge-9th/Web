import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLpCommentInfiniteQuery } from "../../../hooks/lps/comment/useLpCommentInfiniteQuery";
import { useInView } from "react-intersection-observer";
import { useAddCommentMutation } from "../../../hooks/lps/comment/useAddCommentMutation";
import ListComment from "../ListComment/ListComment";
import CommentSkeleton from "../../Common/Skeleton/CommentSkeleton/CommentSkeleton";
import SortButton from "../../Common/Button/SortButton/SortButton";
import * as S from "./styles/CommentStyle";

const Comment = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const numericLpId = Number(lpId);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [comment, setComment] = useState("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLpCommentInfiniteQuery(numericLpId, order, 5);

  const { mutate: addComment, isPending } = useAddCommentMutation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const comments = data?.pages.flatMap((page) => page.data) ?? [];

  const handleAddComment = () => {
    if (!comment.trim()) return;
    addComment({ lpId: numericLpId, content: comment.trim() });
    setComment("");
  };

  return (
    <div className={S.CommentContainer}>
      <div className={S.CommentInnerContainer}>
        <div className={S.CommentTopContainer}>
          <p className={S.CommentP}>댓글</p>
          <SortButton order={order} setOrder={setOrder} />
        </div>

        <div className={S.CommentAddContainer}>
          <input
            type="text"
            placeholder="댓글을 입력해주세요."
            className={S.CommentInputContainer}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            disabled={isPending || !comment.trim()}
            className={S.CommentInputButtonContainer}
          >
            {isPending ? "작성 중..." : "작성"}
          </button>
        </div>

        <ListComment data={comments} lpId={numericLpId} />

        {isFetchingNextPage && (
          <div className={S.CommentSkeletonContainer}>
            {Array.from({ length: 5 }).map((_, i) => (
              <CommentSkeleton key={i} />
            ))}
          </div>
        )}

        <div ref={ref} className="h-[1px]" />
      </div>
    </div>
  );
};

export default Comment;
