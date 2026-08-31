import * as S from "../../styles/pages/movies/MovieStyle";
import MovieList from "../../components/Movie/MovieList";

const Popular = () => {
  return (
    <div className={S.MovieContainer}>
      <MovieList url="movie/popular" />
    </div>
  );
};

export default Popular;
