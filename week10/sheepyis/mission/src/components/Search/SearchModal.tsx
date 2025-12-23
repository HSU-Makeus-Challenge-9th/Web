import type { Movie } from "../../types/movie/movie";
import { memo } from "react";

interface SearchModalProps {
  movie: Movie;
  onClose: () => void;
}

const SearchModal = ({ movie, onClose }: SearchModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-[80%] max-h-[90vh] overflow-y-auto rounded-lg bg-white">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-xl cursor-pointer"
        >
          ✕
        </button>

        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="h-[30vh] w-full object-cover"
          />
        )}

        <div className="p-6">
          <h2 className="text-2xl font-bold">{movie.title}</h2>

          <p className="mt-2 text-sm text-gray-500">
            평점: {movie.vote_average}
            <br />
            개봉일: {movie.release_date}
          </p>

          <p className="mt-4 text-sm leading-relaxed">
            {movie.overview || "줄거리가 없습니다."}
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href={`https://www.imdb.com/find?q=${encodeURIComponent(
                movie.title
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-blue-600 px-4 py-2 text-white cursor-pointer"
            >
              IMDb에서 검색
            </a>

            <button
              onClick={onClose}
              className="rounded border px-4 py-2 cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SearchModal);
