import * as S from "../../styles/pages/movies/MovieStyle";
import MovieList from "../../components/Movie/MovieList";

const Upcoming = () => {
  return (
    <div className={S.MovieContainer}>
      <MovieList url="upcoming" />
    </div>
  );
};

export default Upcoming;
