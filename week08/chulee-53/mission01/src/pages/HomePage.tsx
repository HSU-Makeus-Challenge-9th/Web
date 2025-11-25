import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";

const HomePage = () => {
  const [params] = useSearchParams();
  const searchKeyword = params.get("q") || "";
  const [search, setSearch] = useState(searchKeyword);
  const debouncedQuery = useDebounce(search, 300);

  const { ref, inView } = useInView({ threshold: 0 });

  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, debouncedQuery, order);

  const throttledFetchNext = useThrottle(fetchNextPage, 3000);

  // URL 검색어가 바뀌면 검색 state도 반영
  useEffect(() => {
    setSearch(searchKeyword);
  }, [searchKeyword]);

  useEffect(() => {
  if (inView && !isFetching && hasNextPage) {
    throttledFetchNext();
  }
}, [inView, isFetching, hasNextPage, throttledFetchNext]);

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 정렬 버튼 */}
      <div className="mb-4 flex justify-end">
        <button
          className={`px-4 py-2 cursor-pointer rounded-md border ${
            order === "asc" ? "bg-white text-black" : "bg-black"
          }`}
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
        >
          오래된순
        </button>

        <button
          className={`px-4 py-2 cursor-pointer rounded-md border ${
            order === "desc" ? "bg-white text-black" : "bg-black"
          }`}
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
        >
          최신순
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {isPending && <LpCardSkeletonList count={20} />}

        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}

        {isFetching && <LpCardSkeletonList count={20} />}
      </div>

      {/* 무한 스크롤 트리거 */}
      <div ref={ref} className="h-2" />
    </div>
  );
};

export default HomePage;
