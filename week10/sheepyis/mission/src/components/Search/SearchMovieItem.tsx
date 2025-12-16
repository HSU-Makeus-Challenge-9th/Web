import type { Movie } from "../../types/movie/movie";
import MovieItem from "../Movie/MovieItem";
import { memo } from "react";

interface SearchMovieItemProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const SearchMovieItem = memo(({ movie, onClick }: SearchMovieItemProps) => {
  return (
    <div onClick={() => onClick(movie)}>
      <MovieItem movie={movie} />
    </div>
  );
});

export default SearchMovieItem;
