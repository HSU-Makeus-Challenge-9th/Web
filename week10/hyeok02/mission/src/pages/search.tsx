import { useRef, useEffect, useState, useMemo } from "react";
import List from "../components/movie/movie-list";
import Pagination from "../components/pagination";
import { useMovieSearch } from "../hooks/usemoviesearch";

const SearchPage = () => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState("");
  const [showAdult, setShowAdult] = useState(false);
  const [language, setLanguage] = useState("ko-KR");
  const [page, setPage] = useState(1);
  const [triggered, setTriggered] = useState(false);

  const [searchParams, setSearchParams] = useState<{
    query: string;
    includeAdult: boolean;
    language: string;
    page: number;
  } | null>(null);

  const { data, isLoading, isError } = useMovieSearch(searchParams);

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 확장용
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, []);

  useEffect(() => {
    if (triggered) {
      setSearchParams({
        query,
        includeAdult: showAdult,
        language,
        page,
      });
    }
  }, [page, query, showAdult, language, triggered]);

  const handleSearch = () => {
    setPage(1);
    setSearchParams({
      query,
      includeAdult: showAdult,
      language,
      page: 1,
    });
    setTriggered(true);
  };

  const memoizedMovies = useMemo(() => {
    return data?.results ?? [];
  }, [data]);

  return (
    <div className="w-full px-4 py-4">
      <div className="mx-auto max-w-xl mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center border border-gray-300 rounded p-2 h-10 w-full bg-white">
              <span className="mr-2">🎬</span>
              <input
                type="text"
                placeholder="영화 제목을 입력하세요"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-full bg-transparent focus:outline-none text-sm text-gray-700"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded p-2 h-10 w-full bg-white">
              <span className="mr-2">⚙️</span>
              <input
                type="checkbox"
                id="adult"
                checked={showAdult}
                onChange={(e) => setShowAdult(e.target.checked)}
                className="mr-2 h-4 w-4 text-yellow-400"
              />
              <label htmlFor="adult" className="text-sm text-gray-700">
                성인 콘텐츠 표시
              </label>
            </div>
          </div>

          <div className="flex items-center border border-gray-300 rounded p-2 h-10 mb-4 bg-white">
            <span className="mr-2">🌐</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full h-full bg-transparent focus:outline-none text-sm text-gray-700"
            >
              <option value="ko-KR">한국어</option>
              <option value="en-US">English</option>
            </select>
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center text-base font-semibold"
          >
            🔍 검색하기
          </button>
        </div>
      </div>

      <div className="w-full max-w-screen-xl mx-auto">
        {isLoading && triggered && <p className="text-center">로딩 중...</p>}
        {isError && triggered && <p className="text-center text-red-500">에러 발생</p>}
        {triggered && memoizedMovies.length === 0 && (
          <p className="text-center text-gray-500">검색 결과 없음</p>
        )}
        {triggered && memoizedMovies.length > 0 && (
          <>
            <List movies={memoizedMovies} />
            <Pagination page={page} setPage={setPage} totalPages={data?.total_pages || 1} />
          </>
        )}
        <div ref={observerRef} />
      </div>
    </div>
  );
};

export default SearchPage;
