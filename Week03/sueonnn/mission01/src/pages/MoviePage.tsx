import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { Movie, MovieResponse } from "../types/Movie";

const MoviePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      // 환경 변수에서 API 키를 가져옴
      const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
      const API_URL =
        "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";

      if (!TMDB_API_KEY) {
        setError(
          "TMDB API 키가 설정되지 않았습니다. .env 파일 확인이 필요합니다."
        );
        setLoading(false);
        return;
      }

      try {
        // axios.get 요청 시 MovieResponse 타입으로 응답 데이터를 추론하도록 제네릭을 사용합니다.
        const response = await axios.get<MovieResponse>(API_URL, {
          headers: {
            accept: "application/json",
            // TMDB는 인증을 위해 Bearer 토큰 방식을 사용합니다.
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        });

        // axios는 응답 객체의 'data' 필드에 실제 응답 본문을 담습니다.
        setMovies(response.data.results);
      } catch (err) {
        console.error("영화 데이터를 불러오는 중 오류 발생:", err);
        setError("영화 데이터를 불러오는 데 실패했습니다. 콘솔을 확인하세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []); // 빈 배열: 컴포넌트 마운트 시 최초 1회만 실행 (부수 효과)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        🎬 영화 데이터 로딩 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        ❌ {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-extrabold text-center my-10">
        TMDB 인기 영화 목록
      </h1>

      {/* Tailwind CSS를 이용한 반응형 그리드 및 간격 설정 */}
      <div
        className="grid grid-cols-2 gap-4 p-4 
                   sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 
                   py-10"
      >
        {movies.map((movie) => (
          // MovieCard에 각 영화 객체를 전달
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviePage;
