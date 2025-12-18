import React from "react";
import { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface Props {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieList = ({ movies, onMovieClick }: Props) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  );
};

export default MovieList;
