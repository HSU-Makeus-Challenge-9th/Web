import type { LpDataType } from "../../types/lp";
import LPItem from "./lp-item";

type Props = {
  lps: LpDataType[];
  isLoading?: boolean;
};

const LPList = ({ lps, isLoading = false }: Props) => {
  const skeletonArray = Array(12).fill(0);

  return (
    <section className="grid px-2 gap-2 text-white
                        sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                        xl:grid-cols-5 2xl:grid-cols-5 select-none">
      {isLoading
        ? skeletonArray.map((_, i) => (
            <div
              key={i}
              className="w-full aspect-square bg-gray-700 animate-pulse rounded-md shadow-md"
            />
          ))
        : lps.map((lp) => <LPItem key={lp.id} lp={lp} />)}
    </section>
  );
};

export default LPList;
