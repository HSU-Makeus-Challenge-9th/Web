// src/hooks/useMovies.ts
import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import movieApi from "../apis/movieApi";

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        // 헤더 설정 없이 간단하게 호출
        const { data } = await movieApi.get<MovieResponse>(
          "/movie/popular?language=ko-KR&page=1"
        );

        setMovies(data.results);
      } catch (err) {
        setError("영화 데이터를 가져오는데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};
