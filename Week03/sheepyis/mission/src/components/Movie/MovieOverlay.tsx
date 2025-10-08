import type { Movie } from "../../types/movie/movie";
import * as S from "./MovieStyle";

interface MovieOverlayProps {
  movie: Movie;
}

const MovieOverlay = ({ movie }: MovieOverlayProps) => {
  return (
    <div className={S.MovieItemOverlayContainer}>
      <p className={S.MovieItemOverlayTitle}>{movie.title}</p>
      {movie.overview && <p>{movie.overview}</p>}
    </div>
  );
};

export default MovieOverlay;
