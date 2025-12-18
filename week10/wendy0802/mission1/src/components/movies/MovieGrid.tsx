import React, { useMemo } from 'react';
import MovieCard from './MovieCard';
import type { Movie } from '../../types/movie';

type MovieGridProps = {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
};

const MovieGrid = ({ movies, onSelectMovie }: MovieGridProps) => {
  const movieCards = useMemo(
    () =>
      movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={onSelectMovie}
        />
      )),
    [movies, onSelectMovie],
  );

  if (movies.length === 0) {
    return (
      <p className="mt-8 text-center text-sm text-slate-400">
        검색 결과가 없습니다.
      </p>
    );
  }

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movieCards}
    </div>
  );
};

export default React.memo(MovieGrid);