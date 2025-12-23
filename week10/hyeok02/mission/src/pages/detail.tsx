import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useParams, useNavigate } from "react-router-dom";
import MovieDetailContent from "../components/movie-detail/detailcontent";
import useMovieDetail from "../hooks/usemoviedetail";

const Detail = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const { movie, isLoading, error } = useMovieDetail(movieId as string);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate(-1);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [navigate]);

  if (!movieId) return null;

  if (!movie) return null; 

  return createPortal(
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 text-white max-w-4xl w-full rounded-lg shadow-lg overflow-auto max-h-[90vh] relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 text-white text-2xl"
        >
          &times;
        </button>
        {isLoading ? (
          <p className="text-center my-10">영화 정보를 불러오는 중입니다...</p>
        ) : error ? (
          <p className="text-center my-10 text-red-500">에러가 발생했습니다.</p>
        ) : (
          <MovieDetailContent movie={movie} />
        )}
      </div>
    </div>,
    document.body
  );
};

export default Detail;
