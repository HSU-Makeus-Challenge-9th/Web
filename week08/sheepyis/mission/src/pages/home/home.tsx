import { useState, useEffect, useCallback } from "react";
import useThrottle from "../../hooks/lps/useThrottle";
import ListLp from "../../components/Home/ListLP/ListLP";
import * as S from "../../styles/pages/home/HomeStyle";
import { useInfiniteLpQuery } from "../../hooks/lps/useLpInfiniteQuery";
import { useInView } from "react-intersection-observer";
import LPSkeleton from "../../components/Common/Skeleton/LPSkeleton/LPSkeleton";
import SortButton from "../../components/Common/Button/SortButton/SortButton";

const Home = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteLpQuery(order, 10);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "0px 0px 120px 0px",
  });

  const stableFetchNext = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      console.log("fetchNextPage 실행");
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const throttledFetchNext = useThrottle(stableFetchNext, 3000);

  useEffect(() => {
    if (inView) {
      throttledFetchNext();
    }
  }, [inView, throttledFetchNext]);

  return (
    <div className={S.HomeContainer}>
      <div className={S.HomeSortContainer}>
        <div className={S.HomeSortInnerContainer}>
          <SortButton order={order} setOrder={setOrder} />
        </div>

        {isLoading ? (
          <LPSkeleton count={10} />
        ) : (
          <>
            {data?.pages.map((page) => (
              <ListLp key={page.nextCursor ?? "first"} data={page.data} />
            ))}

            {isFetchingNextPage && <LPSkeleton count={10} />}

            <div ref={ref} style={{ height: "120px" }} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
