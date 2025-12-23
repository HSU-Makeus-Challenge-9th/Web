import React, { useState, useEffect, FormEvent } from "react";
import { useInfiniteGetLpList } from "../hooks/useInfiniteGetLPList";
import { PAGINATION_ORDER } from "../types/common";

const SEARCH_HISTORY_KEY = "lpSearchHistory";

const SearchPage: React.FC = () => {
  // 인풋에 바로 바인딩되는 값
  const [inputValue, setInputValue] = useState("");
  // 실제 검색에 사용하는 값
  const [search, setSearch] = useState("");

  // 최근 검색어 (localStorage 저장)
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteGetLpList({
    limit: 12,
    search,
    order: PAGINATION_ORDER.DESC,
  });

  // 최근 검색어 저장
  const saveSearchHistory = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setRecentSearches((prev) => {
      const next = [trimmed, ...prev.filter((v) => v !== trimmed)].slice(0, 10);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setSearch(trimmed); // 🔥 여기 값이 디바운스되어 API 호출
    saveSearchHistory(trimmed);
  };

  const handleRecentClick = (term: string) => {
    setInputValue(term);
    setSearch(term); // 최근 검색어 클릭 시 바로 검색
  };

  const handleClearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  // LP 리스트 평탄화
  const lpItems =
    data?.pages.flatMap((page) => {
      // CursorBasedResponse 내부 구조에 맞게 data?.data 사용
      // (응답이 { data: { data: LpItem[], hasNext, nextCursor } } 형식이면
      //  page.data.data 로 수정해서 사용)
      // 여기서는 page.data.data 로 가정
      // @ts-ignore 구조에 맞게 조정 필요하면 여기 수정
      return page.data?.data ?? [];
    }) ?? [];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* 상단 검색 박스 */}
      <div className="pt-24 pb-6 px-4 max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          {/* 돋보기 아이콘 */}
          <button
            type="submit"
            className="flex items-center justify-center w-10 h-10 border rounded-full shadow-sm"
          >
            <span className="material-icons">search</span>
          </button>

          {/* 검색 인풋 */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="flex-1 border-b border-gray-400 focus:outline-none focus:border-black text-lg py-2 bg-transparent"
          />

          {/* 검색 타입 드롭다운 (UI만, 실제 필터링 X) */}
          <button
            type="button"
            className="flex items-center gap-1 px-4 py-2 border rounded-md text-sm"
          >
            제목
            <span className="material-icons text-base">expand_more</span>
          </button>
        </form>

        {/* 최근 검색어 */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-gray-600 font-medium">최근 검색어</span>
            {recentSearches.length === 0 && (
              <span className="text-gray-400">없어요</span>
            )}
            {recentSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handleRecentClick(term)}
                className="px-3 py-1 rounded-full border bg-gray-50 hover:bg-gray-100 text-gray-700"
              >
                {term}
              </button>
            ))}
          </div>
          {recentSearches.length > 0 && (
            <button
              type="button"
              onClick={handleClearHistory}
              className="text-gray-500 hover:text-gray-700"
            >
              모두 지우기
            </button>
          )}
        </div>
      </div>

      {/* 결과 영역 */}
      <div className="px-4 pb-12 max-w-5xl mx-auto">
        {isLoading && search && (
          <p className="text-center text-gray-500 mt-10">검색 중...</p>
        )}
        {isError && (
          <p className="text-center text-red-500 mt-10">
            검색 중 오류가 발생했어요.
          </p>
        )}

        {/* 검색어 없을 때 안내 */}
        {!search && (
          <p className="text-center text-gray-400 mt-10">
            검색어를 입력하고 🔍 버튼을 눌러주세요.
          </p>
        )}

        {/* 검색 결과 그리드 */}
        {search && lpItems.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {lpItems.map((lp) => (
                <div
                  key={lp.id}
                  className="relative aspect-square overflow-hidden rounded-lg border bg-gray-100"
                >
                  {/* 썸네일 이미지 */}
                  {/* @ts-ignore: lp.thumbnail 존재 가정 */}
                  {lp.thumbnail ? (
                    <img
                      // @ts-ignore
                      src={lp.thumbnail}
                      // @ts-ignore
                      alt={lp.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      썸네일 없음
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 더 보기 버튼 */}
            <div className="mt-8 flex justify-center">
              {hasNextPage && (
                <button
                  type="button"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-6 py-2 rounded-full border bg-white hover:bg-gray-50 disabled:opacity-60"
                >
                  {isFetchingNextPage ? "불러오는 중..." : "더 보기"}
                </button>
              )}
              {!hasNextPage && (
                <p className="text-gray-400 text-sm">마지막 페이지입니다.</p>
              )}
            </div>
          </>
        )}

        {/* 검색했는데 결과 없을 때 */}
        {search && !isLoading && lpItems.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
