import { Link } from "react-router-dom";
import LoadingSpinner from "../components/movie/LodingSpinner";
import ErrorMessage from "../components/movie/Error";
import Pagination from "../components/button/Pagination";
import { useFetchMovies } from "../hooks/useFetch";

export default function TopRatedPage() {
  const { movies, loading, error, currentPage, totalPages, handlePageChange } =
    useFetchMovies("top_rated");

  // 로딩 상태
  if (loading) {
    return <LoadingSpinner />;
  }

  // 에러 상태
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // 성공 상태
  return (
    <>
      <div className="flex justify-center mb-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-20 max-w-7xl mx-auto">
        {movies.map((m) => (
          <Link
            key={m.id}
            to={`/movies/${m.id}`}
            className="block no-underline text-inherit"
          >
            <div className="relative w-full aspect-[2/3] cursor-pointer group">
              {m.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                  alt={m.title}
                  className="w-full h-full rounded-2xl object-cover group-hover:blur-sm transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 rounded-2xl flex items-center justify-center">
                  <span className="text-gray-400 text-sm">포스터 없음</span>
                </div>
              )}
              <div className="absolute inset-0 rounded-2xl bg-black bg-opacity-60 text-white flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
                <h3 className="text-lg font-semibold mb-2">{m.title}</h3>
                <p className="text-sm leading-relaxed">{m.overview}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
