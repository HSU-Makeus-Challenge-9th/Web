import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorView from "../components/ErrorView";
import Pagination from "../components/Pagination";
import { useMovies } from "../hooks/useMovies";
import { getCategoryFromPath } from "../utils/movie";

export default function MoviePage() {
  const location = useLocation();
  const category = getCategoryFromPath(location.pathname);
  
  const {
    movies,
    isLoading,
    error,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
  } = useMovies(category);

  if (isLoading) {
    return <LoadingSpinner message="영화 데이터를 불러오는 중..." />;
  }

  if (error) {
    return (
      <ErrorView 
        message={error} 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  return (
    <div className="min-h-screen px-8 py-4">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={goToPreviousPage}
        onNext={goToNextPage}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}