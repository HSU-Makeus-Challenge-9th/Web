import * as LS from "../../../Home/ListLP/styles/ListLPStyle";
import * as S from "./styles/LPSkeletonStyle";

interface Props {
  count?: number;
}

const LPSkeleton = ({ count = 10 }: Props) => {
  return (
    <div className={LS.ListLPContainer}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

const SkeletonCard = () => {
  return <div className={S.LPSkeletonContainer}></div>;
};

export default LPSkeleton;
