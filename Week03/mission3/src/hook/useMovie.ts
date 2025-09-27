import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import usePagination from "./usePagination";
import { movieApis } from "../apis/movieApis";

type MovieType = "popular" | "top_rated" | "now_playing" | "upcoming";

export const useMovies = (type: MovieType, initialPage: number = 1) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pagination = usePagination(initialPage);

  const fetchMovies = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      let response;
      switch (type) {
        case "popular":
          response = await movieApis.getPopularMovies(page);
          break;
        case "top_rated":
          response = await movieApis.getTopRatedMovies(page);
          break;
        case "now_playing":
          response = await movieApis.getNowPlayingMovies(page);
          break;
        case "upcoming":
          response = await movieApis.getUpcomingMovies(page);
          break;
      }
      const { data } = response;

      setMovies(data.results);
      pagination.updatePagination(page, data.total_pages, data.total_results); //페이지네이션 등록
    } catch (err) {
      setError("영화 데이터를 가져오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(pagination.currentPage);
  }, [type]);

  const handleNextPage = () => {
    const nextPage = pagination.nextPage();
    if (nextPage !== pagination.currentPage) {
      fetchMovies(nextPage);
    }
  };

  const handlePrevPage = () => {
    const prevPage = pagination.prevPage();
    if (prevPage !== pagination.currentPage) {
      fetchMovies(prevPage);
    }
  };
  return {
    movies,
    loading,
    error,
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    totalResults: pagination.totalResults,
    nextPage: handleNextPage,
    prevPage: handlePrevPage,
    hasNextPage: pagination.hasNextPage,
    hasPrevPage: pagination.hasPrevPage,
  };
};
