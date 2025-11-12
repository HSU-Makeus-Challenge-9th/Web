import * as S from "./styles/CommentSkeletonStyle";

const CommentSkeleton = () => {
  return (
    <div className={S.CommentSkeletonContainer}>
      <div className={S.CommentSkeletonProfileImg} />

      <div className={S.CommentSkeletonExplainContainer}>
        <div className={S.CommentSkeletonName} />
        <div className={S.CommentSkeletonContent} />
      </div>
    </div>
  );
};

export default CommentSkeleton;
