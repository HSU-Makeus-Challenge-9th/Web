import * as S from "../../styles/pages/movies/MovieStyle";
import MovieList from "../../components/Movie/MovieList";

const TopRated = () => {
  return (
    <div className={S.MovieContainer}>
      <MovieList url="movie/top_rated" />
    </div>
  );
};

export default TopRated;
