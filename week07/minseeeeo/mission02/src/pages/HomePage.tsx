import { useEffect, useState } from "react";
import NotFoundPage from "./NotFoundPage";
import type { PAGINATION_ORDER } from "../types/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import LpCard from "../components/lp/LpCard";
import LpCardSkeletonList from "../components/lp/LpCardSkeletonList";
import OrderButton from "../components/common/OrderButton";

const HomePage = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>("desc");

  // (무한스크롤) lp목록 가져오기
  const {
    data: lps,
    isFetching,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteLpList(0, 10, "", order);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      console.log("다음 페이지 로드 트리거");
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <>
      <div className="flex justify-end items-center mt-4 mr-4">
        <OrderButton order={order} setOrder={setOrder} />
      </div>
      {isError && <NotFoundPage />}

      <>
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-5 text-white place-items-center">
          {/* flat == [[1,2], [3,4]] -> [1,2,3,4] */}
          {lps?.pages
            .flatMap((page) => page.data.data)
            .map((lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))}
          {isFetching && <LpCardSkeletonList count={20} />}
        </div>

        <div ref={ref} className="flex justify-center py-4">
          {isFetching && <LoadingSpinner />}
          {!hasNextPage && <p className="text-gray-400 text-sm">페이지 끝</p>}
        </div>
      </>
    </>
  );
};

export default HomePage;
