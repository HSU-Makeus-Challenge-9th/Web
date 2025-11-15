import { useState } from "react";
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

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    },
  });

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

            <div ref={ref} style={{ height: "1px" }} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
