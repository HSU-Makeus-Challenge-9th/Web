import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import type { PAGINATION_ORDER } from "../types/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import useGetInfiniteTagLpList from "../hooks/queries/useGetInfiniteTagLpList";
import { useInView } from "react-intersection-observer";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import LpCard from "../components/lp/LpCard";
import LpCardSkeletonList from "../components/lp/LpCardSkeletonList";
import OrderButton from "../components/common/OrderButton";
import SearchModal from "../components/common/SearchModal";
import { useSearchModal } from "../hooks/useSearchModal";
import useSidebar from "../hooks/useSidebar";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";

const HomePage = () => {
  const location = useLocation();
  const [order, setOrder] = useState<PAGINATION_ORDER>("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"title" | "tag">("title");
  const { isSearchModalOpen, toggleSearchModal } = useSearchModal();
  const { isOpen: isSidebarOpen } = useSidebar();

  // 검색어 디바운스 (300ms)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // 홈페이지로 돌아왔을 때 검색 상태 초기화
  // 처음 마운트될떄 or 검색하고 다시 돌아왔을떄 초기화 되도록
  useEffect(() => {
    if (location.state?.resetSearch) {
      setSearchQuery("");
      setSearchType("title");

      // state 초기화 (다음 방문 시 영향 없도록)
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // (무한스크롤) lp목록 가져오기 - 제목 검색 (+검색어 디바운싱된거 사용)
  const {
    data: lpsByTitle,
    isFetching: isFetchingTitle,
    isError: isErrorTitle,
    hasNextPage: hasNextPageTitle,
    fetchNextPage: fetchNextPageTitle,
  } = useGetInfiniteLpList(
    10,
    searchType === "title" ? debouncedSearchQuery : "",
    order
  );

  // (무한스크롤) lp목록 가져오기 - 태그 검색 (+검색어 디바운스된거 사용)
  const {
    data: lpsByTag,
    isFetching: isFetchingTag,
    isError: isErrorTag,
    hasNextPage: hasNextPageTag,
    fetchNextPage: fetchNextPageTag,
  } = useGetInfiniteTagLpList(
    searchType === "tag" ? debouncedSearchQuery : "",
    0,
    10,
    order
  );

  // 현재 검색 타입에 따라 사용할 데이터 선택 (useMemo)
  const lps = useMemo(
    () => (searchType === "tag" ? lpsByTag : lpsByTitle),
    [searchType, lpsByTag, lpsByTitle]
  );
  const isFetching = useMemo(
    () => (searchType === "tag" ? isFetchingTag : isFetchingTitle),
    [searchType, isFetchingTag, isFetchingTitle]
  );
  const isError = useMemo(
    () => (searchType === "tag" ? isErrorTag : isErrorTitle),
    [searchType, isErrorTag, isErrorTitle]
  );
  const hasNextPage = useMemo(
    () => (searchType === "tag" ? hasNextPageTag : hasNextPageTitle),
    [searchType, hasNextPageTag, hasNextPageTitle]
  );
  const fetchNextPage = useMemo(
    () => (searchType === "tag" ? fetchNextPageTag : fetchNextPageTitle),
    [searchType, fetchNextPageTag, fetchNextPageTitle]
  );

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const handleFetchNextPage = useCallback(() => {
    console.log("다음 페이지 로드 트리거 (스로틀링 적용)");
    fetchNextPage();
  }, [fetchNextPage]);

  // 스로틀링된 fetchNextPage 콜백 생성 (500ms 주기)
  const throttledFetchNextPage = useThrottle(handleFetchNextPage, 500);

  useEffect(() => {
    // inView가 true && 다음 페이지가 있음 && !로딩중
    // => 스로틀링된 콜백 실행
    if (inView && hasNextPage && !isFetching) {
      throttledFetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, throttledFetchNextPage]);

  // 검색 핸들러 (useCallback)
  const handleSearch = useCallback(
    (query: string, type: "title" | "tag") => {
      setSearchQuery(query);
      setSearchType(type);
      toggleSearchModal();
    },
    [toggleSearchModal]
  );

  return (
    <div className="relative">
      {/* 검색 모달 */}
      {isSearchModalOpen && (
        <div
          className={`
            fixed top-16 right-0 z-50 bg-black/95 backdrop-blur-sm shadow-lg
            transition-all duration-500 ease-in-out
            ${isSidebarOpen ? "left-[16.67%]" : "left-0"}
          `}
        >
          <SearchModal onSearch={handleSearch} onClose={toggleSearchModal} />
        </div>
      )}

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
    </div>
  );
};

export default HomePage;
