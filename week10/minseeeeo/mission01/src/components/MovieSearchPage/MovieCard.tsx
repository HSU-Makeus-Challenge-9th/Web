import { useState, useCallback, memo } from "react";
import type { Movie } from "../../types/movie";
import MovieModal from "./MovieModal";

interface IMovieCard {
  movie: Movie;
}

const MovieCard = ({ movie }: IMovieCard) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div
        className="border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
        onClick={handleOpenModal}
      >
        {/* 포스터 */}
        <div className="relative w-full h-60">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`${movie.title}의 포스터`}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute right-2 top-2 bg-blue-500 text-white rounded-md px-1.5 py-1 text-xs font-semibold">
            {movie.vote_average.toFixed(1)}
          </div>
        </div>

        {/* 영화 정보 */}
        <div className="p-3">
          <div className="text-sm font-semibold">{movie.title}</div>
          <div className="text-xs text-gray-400 mt-2">{movie.release_date}</div>
          <p className="text-xs text-gray-500 mt-2">
            {movie.overview.length > 50
              ? movie.overview.slice(0, 50) + "..."
              : movie.overview}
          </p>
        </div>
      </div>

      <MovieModal
        movie={movie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default memo(MovieCard);
