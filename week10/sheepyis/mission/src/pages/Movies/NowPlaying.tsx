import * as S from "../../styles/pages/movies/MovieStyle";
import MovieList from "../../components/Movie/MovieList";

const NowPlaying = () => {
  return (
    <div className={S.MovieContainer}>
      <MovieList url="movie/now_playing" />
    </div>
  );
};

export default NowPlaying;
