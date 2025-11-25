import { useEffect, useState } from "react";
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

const HomePage = () => {
  const location = useLocation();
  const [order, setOrder] = useState<PAGINATION_ORDER>("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"title" | "tag">("title");
  const { isSearchModalOpen, closeSearchModal } = useSearchModal();
  const { isOpen: isSidebarOpen } = useSidebar();

  // 검색어를 300ms 디바운스 처리
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // 홈페이지로 돌아왔을 때 검색 상태 초기화
  useEffect(() => {
    // location state에 resetSearch가 true이거나, 처음 마운트될 때 초기화
    if (location.state?.resetSearch) {
      setSearchQuery("");
      setSearchType("title");
      // state 초기화 (다음 방문 시 영향 없도록)
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // (무한스크롤) lp목록 가져오기 - 제목 검색 (디바운스된 검색어 사용)
  const {
    data: lpsByTitle,
    isFetching: isFetchingTitle,
    isError: isErrorTitle,
    hasNextPage: hasNextPageTitle,
    fetchNextPage: fetchNextPageTitle,
  } = useGetInfiniteLpList(0, 10, searchType === "title" ? debouncedSearchQuery : "", order);

  // (무한스크롤) lp목록 가져오기 - 태그 검색 (디바운스된 검색어 사용)
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

  // 현재 검색 타입에 따라 사용할 데이터 선택
  const lps = searchType === "tag" ? lpsByTag : lpsByTitle;
  const isFetching = searchType === "tag" ? isFetchingTag : isFetchingTitle;
  const isError = searchType === "tag" ? isErrorTag : isErrorTitle;
  const hasNextPage = searchType === "tag" ? hasNextPageTag : hasNextPageTitle;
  const fetchNextPage = searchType === "tag" ? fetchNextPageTag : fetchNextPageTitle;

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

  // 검색 핸들러
  const handleSearch = (query: string, type: "title" | "tag") => {
    setSearchQuery(query);
    setSearchType(type);
    closeSearchModal();
  };

  return (
    <div className="relative">
      {/* 검색 모달 - 오버레이 */}
      {isSearchModalOpen && (
        <div
          className={`
            fixed top-16 right-0 z-50 bg-black/95 backdrop-blur-sm shadow-lg
            transition-all duration-500 ease-in-out
            ${isSidebarOpen ? "left-[16.67%]" : "left-0"}
          `}
        >
          <SearchModal onSearch={handleSearch} onClose={closeSearchModal} />
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
