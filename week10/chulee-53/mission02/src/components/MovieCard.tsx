import { useCallback, useState } from "react";
import type { Movie } from "../types/movie";
import MovieModal from "./MovieModal";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const imageBaseUrl = "https://images.tmdb.org/t/p/w500";
  const fallbackImageImage =
    "https://cdn.shopify.com/s/files/1/1796/6745/products/PlaceholderImage-ProductPhoto_f5f4ba2b-15bb-43b1-8b17-44dc32ca7c58.png?v=1676399038";

  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal((prev) => !prev);
  }, []);

  return (
    <>
      {isOpenModal && (
        <MovieModal movie={movie} onClickToggleModal={onClickToggleModal} />
      )}
      <div
        onClick={onClickToggleModal}
        className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
      >
        <div className="relative h-80 overflow-hidden">
          <img
            src={
              movie.poster_path
                ? `${imageBaseUrl}${movie.poster_path}`
                : fallbackImageImage
            }
            alt={`${movie.title} 포스터`}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
          <div className="absolute right-2 top-2 rounded-md bg-blue-500 px-2 py-1 text-sm font-bold text-white">
            {movie.vote_average.toFixed(1)}
          </div>
        </div>

        <div className="p-4">
          <h3 className="mb-2 text-lg font-bold text-gray-800">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-600">
            {movie.release_date} | {movie.original_language.toUpperCase()}
          </p>
          <p className="mt-2 text-sm text-gray-700">
            {movie.overview.length > 100
              ? `${movie.overview.slice(0, 100)}...`
              : movie.overview}
          </p>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
