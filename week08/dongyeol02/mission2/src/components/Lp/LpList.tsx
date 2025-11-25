import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLpsAll } from "../../hooks/useLpsAll";
import LpSkeletonList from "../skeleton/LpSkeletonList";
import LoadingSpinner from "../LoadingSpinner";
import type { LpApiData, LpItem } from "../../types/lp";
import type { InfiniteData } from "@tanstack/react-query";

const LpList = () => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLpsAll(order);

  const allLps: LpItem[] =
    (data as InfiniteData<LpApiData> | undefined)?.pages.flatMap(
      (page) => page.data
    ) ?? [];

  const toggleOrder = () => {
    setOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  //loadMoreRef로 지정한 DOM 요소가 화면(뷰포트)에 들어왔는지 감지하는 관찰자(Observer)생성
  //해당 요소가 화면에 보이면 다음 페이지 데이터를 불러오는(fetchNextPage()) 작업수행함,,
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [handleObserver]);

  if (isLoading) {
    return (
      <div className="p-5 bg-gray-900 min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: "20px", color: "red", border: "1px solid red" }}>
        <p>⚠️ 데이터 로딩 중 에러 발생: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-10 flex flex-col gap-y-5">
      <div className="text-2xl">LP 목록</div>

      <button
        onClick={toggleOrder}
        className="px-4 py-2 cursor-pointer mb-5 bg-gray-200 rounded-2xl w-30 h-auto"
      >
        정렬: {order === "desc" ? "최신순 (Desc)" : "오래된순 (Asc)"}
      </button>

      <ul className="grid grid-cols-5 gap-4">
        {allLps.map((lp: LpItem) => (
          <Link
            key={lp.id}
            to={`/lp/${lp.id}`}
            className="relative overflow-hidden group"
          >
            <li className="relative block">
              <img
                src={lp.thumbnail}
                alt={`${lp.title} 썸네일`}
                className="w-full h-auto object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 text-white">
                <h3 className="text-lg font-bold truncate">{lp.title}</h3>
                <p className="text-sm text-gray-300">
                  업로드일: {new Date(lp.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm font-semibold mt-1">
                  ❤️ 좋아요: {lp.likes?.length ?? 0}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>

      {isFetchingNextPage && (
        <div className="mt-10">
          <LpSkeletonList count={5} />
        </div>
      )}

      {/* 무한스크롤 감지용 div */}
      <div ref={loadMoreRef} />

      {allLps.length === 0 && !isLoading && !isError && (
        <p className="text-center text-gray-500 mt-10">표시할 LP가 없습니다.</p>
      )}
    </div>
  );
};

export default LpList;
