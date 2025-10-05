import usePaginatedMovies from "../../hooks/usepaginated";
import MovieList from "../../components/movie/movie-list";
import Spinner from "../../components/spinner";
import Pagination from "../../components/pagination";

const NowPlaying = () => {
  const { movies, loading, error, page, setPage } =
    usePaginatedMovies("now_playing");

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <MovieList movies={movies} />
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default NowPlaying;
