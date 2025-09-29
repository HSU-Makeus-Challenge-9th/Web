import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/common";
import { Movie, MovieResponse } from "../types/Movie";

const API_BASE_URL = "https://api.themoviedb.org/3/movie/";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MoviePage: React.FC = () => {
  // URL 경로 매개변수 (예: /movies/:category)에서 'category' 값을 가져옵니다.
  const { category = "popular" } = useParams<{ category: string }>();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPage, setTotalPage] = useState(1); // 페이지네이션을 위해 총 페이지 수 저장

  // 페이지 이동 처리 함수
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (!TMDB_API_KEY) {
        setIsError(true);
        return;
      }

      // 요청 시작 시 로딩 상태 설정
      setIsPending(true);
      setIsError(false);

      try {
        const url = `${API_BASE_URL}${category}?language=ko-KR&page=${page}`;

        const response = await axios.get<MovieResponse>(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        });

        setMovies(response.data.results);
        setTotalPage(response.data.total_pages); // 총 페이지 수 업데이트
      } catch (err) {
        console.error("영화 데이터 호출 오류:", err);
        setIsError(true);
      } finally {
        // 성공/실패와 상관없이 요청 완료 후 로딩 상태 해제
        setIsPending(false);
      }
    };

    // category (경로 변경) 또는 page (페이지네이션)가 변경될 때마다 재실행
    fetchMovies();
  }, [category, page]);

  // === 로딩 스피너 렌더링 ===
  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // === 에러 메시지 렌더링 ===
  if (isError) {
    return (
      <div className="text-center p-10 text-red-500 text-2xl font-bold">
        🚨 데이터를 불러오는 데 오류가 발생했습니다. (카테고리: {category})
      </div>
    );
  }

  // === 메인 콘텐츠 렌더링 ===
  return (
    <div className="p-4">
      {/* 제목 (현재 카테고리 표시) */}
      <h1 className="text-4xl font-extrabold text-center my-8 capitalize">
        {category.replace("_", " ")} 영화 목록
      </h1>

      {/* 영화 목록 그리드 */}
      <div
        className="grid grid-cols-2 gap-4 p-4 
                   sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 
                   py-10"
      >
        {movies.length > 0 ? (
          movies.map((movie) => (
            // MovieCard 컴포넌트를 사용하고, MovieCard.tsx에서 네비게이트 처리
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
            결과가 없습니다.
          </p>
        )}
      </div>

      {/* 페이지네이션 버튼 */}
      <div className="flex justify-center items-center gap-4 my-8">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1 || isPending}
          className={`px-6 py-3 rounded-lg text-white transition duration-200 
            ${
              page === 1 || isPending
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-700"
            }`}
        >
          &lt; 이전 페이지
        </button>

        <span className="text-xl font-bold">
          {page} / {totalPage}
        </span>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPage || isPending}
          className={`px-6 py-3 rounded-lg text-white transition duration-200 
            ${
              page >= totalPage || isPending
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-700"
            }`}
        >
          다음 페이지 &gt;
        </button>
      </div>
    </div>
  );
};

export default MoviePage;
