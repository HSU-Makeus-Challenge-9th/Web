import LoadingSpinner from "../component/LoadingSpinner";
import MovieCard from "../component/MovieCard";
import Pagination from "../component/Pagination";
import { useMovies } from "../hook/useMovie";

const NowPlayingPage = () => {
  const {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  } = useMovies("now_playing", 1);

  if (loading) {
    return (
      <LoadingSpinner message="개봉중인 영화를 불러오는 중..." size="lg" />
    );
  }
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <>
      <div className="p-6 flex flex-col justify-center items-center gap-y-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {" "}
          상영중인 영화 목록
        </h1>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={prevPage}
          onNext={nextPage}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        ></Pagination>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
};
export default NowPlayingPage;
