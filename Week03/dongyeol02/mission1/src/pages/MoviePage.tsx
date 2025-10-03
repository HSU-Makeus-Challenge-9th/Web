import MovieCard from "../component/MovieCard";
import { useMovies } from "../hook/useMovie";
const MoviePage = () => {
  const { movies, loading, error } = useMovies();

  if (loading) return <div className="text-center p-8">로딩 중...</div>;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center"> 인기 영화 목록</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
};
export default MoviePage;
