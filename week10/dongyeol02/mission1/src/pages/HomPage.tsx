// pages/HomePage.tsx
import { type FormEvent, useCallback, useState } from "react";

import type { Movie } from "../types/movie";
import { movieApis } from "../apis/movieApis";
import MovieModal from "../component/MovieModal";
import MovieCardInModal from "../component/MovieCardInModal";

const HomePage = () => {
  const [query, setQuery] = useState("");

  const [includeAdult, setIncludeAdult] = useState(false);

  const [language, setLanguage] = useState("ko-KR");

  // 검색 결과
  const [movies, setMovies] = useState<Movie[]>([]);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;

    const { data } = await movieApis.searchMovies({
      query,
      includeAdult,
      language,
      page: 1,
    });

    setMovies(data.results);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <label className="block text-sm font-semibold mb-1">
                  영화 제목
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="영화 제목을 입력하세요"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 mt-2 md:mt-6">
                <input
                  id="includeAdult"
                  type="checkbox"
                  className="w-8 h-8"
                  checked={includeAdult}
                  onChange={(e) => setIncludeAdult(e.target.checked)}
                />
                <label htmlFor="includeAdult" className="text-sm font-medium">
                  성인 콘텐츠 표시
                </label>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-3">
              <span className="text-sm font-semibold">언어</span>
              <select
                className="border rounded-lg px-3 py-2 w-full"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="ko-KR">한국어 (ko-KR)</option>
                <option value="en-US">영어 (en-US)</option>
                <option value="ja-JP">일본어 (ja-JP)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 mt-2"
            >
              <span role="img" aria-label="search">
                🔍
              </span>
              검색하기
            </button>
          </form>
        </div>
      </div>

      {/* 결과 영역 */}
      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCardInModal
            key={movie.id}
            movie={movie}
            onClick={handleOpenModal}
          />
        ))}
      </div>
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default HomePage;
