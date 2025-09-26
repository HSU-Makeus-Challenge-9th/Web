import { useFetch } from "../../hooks/useFetch";
import type { Movie } from "../../types/movie/movie";
import * as S from "./MovieStyle";
import MovieItem from "./MovieItem";

interface MovieListProps {
  url: string;
}

const MovieList = ({ url }: MovieListProps) => {
  const { data, error, loading } = useFetch<{ results: Movie[] }>(url);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  if (!data) return null;

  return (
    <div className={S.MovieListContainer}>
      {data.results.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
