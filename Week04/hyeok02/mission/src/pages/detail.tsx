import { useParams } from "react-router-dom";
import MovieDetailContent from "../components/movie-detail/detailcontent";
import useMovieDetail from "../hooks/usemoviedetail";

const MovieDetails = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { movie, isLoading, error, director, cast } = useMovieDetail(movieId as string);

  if (isLoading) {
    return <p className="text-white text-center mt-10">영화 정보를 불러오는 중입니다...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">에러가 발생했습니다.</p>;
  }

  return (
    <MovieDetailContent
      movie={movie!}
      directorInfo={director}
      mainCast={cast}
    />
  );
};

export default MovieDetails;
