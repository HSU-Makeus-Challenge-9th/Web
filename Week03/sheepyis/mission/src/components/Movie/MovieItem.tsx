import type { Movie } from "../../types/movie/movie";
import * as S from "./MovieStyle";
import MovieOverlay from "./MovieOverlay";

interface MovieItemProps {
  movie: Movie;
}

const MovieItem = ({ movie }: MovieItemProps) => {
  return (
    <div className={S.MovieItemContainer}>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className={S.MovieItemImg}
        />
      ) : (
        <div className={S.MovieItemImg} />
      )}

      <MovieOverlay movie={movie} />
    </div>
  );
};

export default MovieItem;
