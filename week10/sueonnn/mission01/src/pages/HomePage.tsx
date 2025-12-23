import React, { useState, useCallback, useMemo } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import { useFetch } from "../hooks/useFetch";
import { Movie, MovieFilters, MovieResponse } from "../types/movie";

const HomePage = () => {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "",
    include_adult: false,
    language: "ko-KR",
  });

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = useCallback((newFilters: MovieFilters) => {
    setFilters(newFilters);
  }, []);

  const fetchOptions = useMemo(
    () => ({
      params: {
        query: filters.query,
        include_adult: filters.include_adult,
        language: filters.language,
      },
    }),
    [filters]
  );

  const { data, loading, error } = useFetch<MovieResponse>(
    "/search/movie",
    fetchOptions
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-2">MOVIE FINDER</h1>
        <p className="text-gray-500 italic">
          TMDB API를 활용한 실시간 영화 검색 서비스
        </p>
      </header>

      <MovieFilter onSearch={handleSearch} />

      {loading ? (
        <div className="text-center py-20 font-bold text-blue-500 animate-pulse">
          영화 정보를 가져오는 중...
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">{error}</div>
      ) : (
        <MovieList
          movies={data?.results || []}
          onMovieClick={setSelectedMovie}
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
