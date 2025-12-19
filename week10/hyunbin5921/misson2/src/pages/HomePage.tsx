import { useCallback, useEffect, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import type { Movie, MovieFilters, MovieResponse } from "../types/movie";
import  MovieDetailModal  from "../components/MovieDetailModal";

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const axiosRequestConfig = useMemo(
    (): { params: MovieFilters } => ({ params: filters }),
    [filters]
  );

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig
  );

  const handleMovieFilter = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters]
  );
  useEffect(() => {
    document.body.style.overflow = selectedMovie ? "hidden" : "auto";
  }, [selectedMovie]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-10">
      <MovieFilter onChange={handleMovieFilter} />
      {isLoading ? (
        <div>로딩 중입니다</div>
      ) : (
        <MovieList
          movies={data?.results || []}
          onMovieClick={setSelectedMovie}
        />
      )}
      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

// 검색 필터

// 영화 무비
