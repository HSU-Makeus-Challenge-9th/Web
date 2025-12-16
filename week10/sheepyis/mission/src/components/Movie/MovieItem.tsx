import type { Movie } from "../../types/movie/movie";
import * as S from "./MovieStyle";
import MovieOverlay from "./MovieOverlay";
import { memo } from "react";

interface MovieItemProps {
  movie: Movie;
  onClick?: () => void;
}

const MovieItem = ({ movie, onClick }: MovieItemProps) => {
  return (
    <div className={S.MovieItemContainer} onClick={onClick}>
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

export default memo(MovieItem);
