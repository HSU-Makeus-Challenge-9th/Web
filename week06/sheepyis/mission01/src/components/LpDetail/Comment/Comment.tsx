import { useState, useEffect } from "react";
import { useLpCommentInfiniteQuery } from "../../../hooks/lps/useLpCommentInfiniteQuery";
import { useInView } from "react-intersection-observer";
import ListComment from "../ListComment/ListComment";
import CommentSkeleton from "../../Common/Skeleton/CommentSkeleton/CommentSkeleton";
import SortButton from "../../Common/Button/SortButton/SortButton";
import * as S from "./styles/CommentStyle";

const Comment = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLpCommentInfiniteQuery(1, order, 5);

  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const comments = data?.pages.flatMap((page) => page.data) ?? [];

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
          />
          <button className={S.CommentInputButtonContainer}>작성</button>
        </div>

        <ListComment data={comments} />

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
