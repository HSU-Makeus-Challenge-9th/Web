// src/pages/LpListScreen.tsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import type { LpItem } from "../types/lp";
import type { SortOrder } from "../types/common";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useInfiniteGetLpList } from "../hooks/useInfiniteGetLpList";
import { useThrottle } from "../hooks/useThrottle";

// 로딩 스켈레톤 컴포넌트
export const LpSkeleton = () => (
  <div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg aspect-square w-full">
    <div className="h-full w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
  </div>
);

// 에러 상태 컴포넌트
export const ErrorState = ({
  error,
  refetch,
}: {
  error: Error;
  refetch: () => void;
}) => (
  <div className="col-span-full flex flex-col items-center justify-center p-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
    <svg
      className="w-12 h-12 text-red-500 mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <p className="text-red-600 dark:text-red-400 font-semibold mb-2">
      목록을 불러오는데 실패했습니다.
    </p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
      {(error as Error)?.message}
    </p>
    <button
      onClick={refetch}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 shadow-md"
    >
      다시 시도
    </button>
  </div>
);

// LP 카드
const LpCard = ({ item }: { item: LpItem }) => {
  const navigate = useNavigate();
  const likesCount = item.likes?.length || 0;

  const timeAgo = (dateString: string): string => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMinutes = Math.floor(
      (now.getTime() - past.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    if (diffInMinutes < 24 * 60)
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / (24 * 60))} days ago`;
  };

  const handleCardClick = () => {
    navigate(`/lp/${item.id}`);
  };

  return (
    <div
      className="rounded-lg overflow-hidden cursor-pointer relative group"
      onClick={handleCardClick}
    >
      <div className="relative aspect-square w-full bg-gray-800 overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://placehold.co/500x500/1f2937/ffffff?text=DOLIGO";
            target.onerror = null;
          }}
        />

        <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 p-4 flex flex-col justify-end">
          <div className="flex flex-col space-y-2">
            <h3 className="text-white text-lg font-bold line-clamp-2">
              {item.title}
            </h3>
            <p className="text-gray-300 text-sm">{timeAgo(item.createdAt)}</p>
            <div className="flex items-center mt-2">
              <svg
                className="w-5 h-5 text-red-400 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
              <span className="text-sm text-white font-semibold">
                {likesCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LpListScreen = () => {
  const [sort, setSort] = useState<SortOrder>("desc");

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteGetLpList({
    order: sort,
    limit: 12,
    search: "",
  });

  // 무한 스크롤 관찰 대상
  const { ref, inView } = useInView({ threshold: 0 });

  // inView를 1초 단위로만 반영
  const throttledInView = useThrottle(inView, 1000);

  // 직전 throttledInView 값을 기억해서 false → true 되는 순간에만 호출
  const prevThrottledInViewRef = useRef(throttledInView);

  useEffect(() => {
    const prev = prevThrottledInViewRef.current;

    console.log("--- Scroll Debug (with throttle) ---");
    console.log("1. inView(raw):", inView);
    console.log("2. inView(throttled):", throttledInView);
    console.log("3. prev(throttled):", prev);
    console.log("4. hasNextPage:", hasNextPage);
    console.log("5. isFetchingNextPage:", isFetchingNextPage);

    // ✨ false -> true 로 바뀌는 순간 + 아직 로딩 중이 아닐 때만 호출
    if (!prev && throttledInView && hasNextPage && !isFetchingNextPage) {
      console.log("✅ [THROTTLED EDGE] fetchNextPage() 호출!");
      fetchNextPage();
    }

    // 현재 값을 다음 렌더를 위해 저장
    prevThrottledInViewRef.current = throttledInView;
  }, [inView, throttledInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allLps: LpItem[] = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.data || []) ?? [];
  }, [data]);

  const toggleSort = (newSort: SortOrder) => {
    if (sort !== newSort) {
      setSort(newSort);
      refetch();
    }
  };

  const getSortButtonClass = (buttonSort: SortOrder) => {
    const isSelected = sort === buttonSort;
    const base =
      "px-4 py-2 font-bold rounded-lg transition-colors duration-150 shadow-md";

    if (isSelected) {
      return `${base} bg-white text-gray-900`;
    }
    return `${base} text-white hover:bg-gray-700/50 border border-gray-700`;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8 pt-0">
      <div className="max-w-7xl mx-auto">
        {/* 정렬 버튼 섹션 */}
        <div className="flex justify-end space-x-2 py-4 sticky top-0 bg-gray-900 z-20">
          <button
            onClick={() => toggleSort("asc")}
            className={getSortButtonClass("asc")}
            disabled={isPending}
          >
            오래된순
          </button>
          <button
            onClick={() => toggleSort("desc")}
            className={getSortButtonClass("desc")}
            disabled={isPending}
          >
            최신순
          </button>
        </div>

        {/* 로딩/에러/데이터 표시 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {isPending &&
            !isFetchingNextPage &&
            Array.from({ length: 12 }).map((_, i) => <LpSkeleton key={i} />)}

          {isError && (
            <ErrorState error={error as Error} refetch={() => refetch()} />
          )}

          {!isPending &&
            !isError &&
            allLps.map((lp) => <LpCard key={lp.id} item={lp} />)}

          {/* 무한 스크롤 감지 요소 */}
          <div className="col-span-full h-10" ref={ref} />

          {hasNextPage &&
            isFetchingNextPage &&
            Array.from({ length: 6 }).map((_, i) => (
              <LpSkeleton key={i + 100} />
            ))}

          {!isPending && !isError && allLps.length === 0 && (
            <div className="col-span-full text-center p-12 text-gray-500">
              <p className="text-xl font-semibold mb-2">목록이 비어있습니다.</p>
              <p>정렬 조건을 변경하거나 새로운 LP를 추가해보세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LpListScreen;
