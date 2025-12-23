import React from "react";
import type { Movie } from "../../types/movie";

type MovieCardProps = {
  movie: Movie;
  onSelect: (movie: Movie) => void;
};

const MovieCard = ({ movie, onSelect }: MovieCardProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(movie)}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-slate-900/70 text-left shadow-md transition hover:-translate-y-1 hover:border-teal-400/70 hover:shadow-teal-500/20"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-100">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
            No Image
          </div>
        )}
        <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white shadow-md">
          {movie.voteAverage.toFixed(1)}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3 bg-white">
        <h2 className="text-sm font-semibold text--black">{movie.title}</h2>
        <p className="text-xs text-slate-400">
          {movie.releaseDate || "정보 없음"}
        </p>
        <p className="mt-1 line-clamp-2 text-xs text-slate-600">
          {movie.overview || "줄거리 정보가 없습니다."}
        </p>
      </div>
    </button>
  );
};

export default React.memo(MovieCard);
