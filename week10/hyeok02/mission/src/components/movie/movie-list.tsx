import { useCallback } from "react";
import Item from "./movie-item";
import type { Movie } from "../../types/movie";

type Props = {
  movies: Movie[];
};

const MovieList = ({ movies }: Props) => {
  const renderItem = useCallback(
    (movie: Movie) => <Item key={movie.id} movie={movie} />, []
  );

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {movies.map(renderItem)}
    </div>
  );
};

export default MovieList;
