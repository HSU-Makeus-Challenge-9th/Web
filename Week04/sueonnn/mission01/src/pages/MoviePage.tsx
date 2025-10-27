import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/common";
import { MovieResponse } from "../types/Movie";
import useCustomFetch from "../hooks/useCustomFetch";

const API_BASE_URL = "https://api.themoviedb.org/3/movie/";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MoviePage: React.FC = () => {
  const { category = "popular" } = useParams<{ category: string }>();
  const [page, setPage] = useState(1);

  // URL 생성 (category나 page가 변경되면 자동으로 재요청)
  const url = useMemo(() => {
    if (!TMDB_API_KEY) return null;
    return `${API_BASE_URL}${category}?language=ko-KR&page=${page}`;
  }, [category, page]);

  // 🎯 커스텀 훅 사용!
  const { data, loading, error } = useCustomFetch<MovieResponse>(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  });

  // 페이지 이동 처리 함수
  const handlePageChange = (newPage: number) => {
    if (data && newPage >= 1 && newPage <= data.total_pages) {
      setPage(newPage);
    }
  };

  // === 로딩 스피너 렌더링 ===
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // === 에러 메시지 렌더링 ===
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center p-10">
          <p className="text-3xl text-red-500 font-bold mb-4">🚨 오류 발생</p>
          <p className="text-xl text-gray-300 mb-6">{error}</p>
          <p className="text-gray-400">카테고리: {category}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!data || !data.results) {
    return (
      <div className="text-center p-10 text-gray-400 text-xl">
        영화 데이터를 불러올 수 없습니다.
      </div>
    );
  }

  const movies = data.results;
  const totalPages = data.total_pages;

  // === 메인 콘텐츠 렌더링 ===
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* 제목 섹션 */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center my-12 capitalize bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
          {category.replace("_", " ")} 영화 목록
        </h1>

        {/* 영화 목록 그리드 */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 py-10">
          {movies && movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p className="col-span-full text-center text-gray-400 text-xl">
              결과가 없습니다.
            </p>
          )}
        </div>

        {/* 페이지네이션 버튼 */}
        <div className="flex justify-center items-center gap-6 my-12">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`px-8 py-3 rounded-lg font-bold text-white transition-all duration-200 transform hover:scale-105
              ${
                page === 1
                  ? "bg-gray-700 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
              }`}
          >
            ← 이전
          </button>

          <div className="bg-gray-800 px-6 py-3 rounded-lg shadow-xl">
            <span className="text-2xl font-bold text-yellow-400">{page}</span>
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-xl text-gray-300">{totalPages}</span>
          </div>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className={`px-8 py-3 rounded-lg font-bold text-white transition-all duration-200 transform hover:scale-105
              ${
                page >= totalPages
                  ? "bg-gray-700 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
              }`}
          >
            다음 →
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
