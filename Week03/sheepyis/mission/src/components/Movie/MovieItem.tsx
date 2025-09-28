import type { Movie } from "../../types/movie/movie";
import * as S from "./MovieStyle";
import MovieOverlay from "./MovieOverlay";
import { useNavigate } from "react-router-dom";

interface MovieItemProps {
  movie: Movie;
}

const MovieItem = ({ movie }: MovieItemProps) => {
  const navigate = useNavigate();

  const handleMovieDetailClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div className={S.MovieItemContainer} onClick={handleMovieDetailClick}>
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
