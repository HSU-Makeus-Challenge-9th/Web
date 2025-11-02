import LpCommentsSkeleton from "./LpCommentsSkeleton";

interface LpCommentsSkeletonListProps {
  count: number;
}

const LpCommentsSkeletonList = ({ count }: LpCommentsSkeletonListProps) => {
  return (
    <>
      {new Array(count).fill(0).map((_, idx) => (
        <LpCommentsSkeleton key={idx} />
      ))}
    </>
  );
};

export default LpCommentsSkeletonList;
