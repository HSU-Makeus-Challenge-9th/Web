import React from "react";
import type { Movie } from "../../types/movie";

type MovieModalProps = {
  movie: Movie;
  onClose: () => void;
};

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const popularityPercent = Math.round((movie.voteAverage / 10) * 100);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="relative h-64 w-full bg-black">
          {movie.backdropUrl || movie.posterUrl ? (
            <img
              src={movie.backdropUrl ?? (movie.posterUrl as string)}
              alt={movie.title}
              className="h-full w-full object-cover opacity-80"
            />
          ) : null}

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-xl text-white hover:bg-black/80"
          >
            ×
          </button>

          <div className="absolute bottom-6 left-8">
            <h1 className="text-2xl font-bold text-white drop-shadow-md">
              {movie.title}
            </h1>
          </div>
        </div>


        <div className="grid gap-8 bg-white px-8 py-6 lg:grid-cols-[220px,1fr]">

          <div className="flex justify-center">
            <div className="w-44 overflow-hidden rounded-lg bg-slate-100 shadow-md">
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-64 items-center justify-center text-sm text-slate-400">
                  No Image
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-blue-600">
                {movie.voteAverage.toFixed(1)}
              </span>
              {movie.voteCount != null && (
                <span className="text-sm text-slate-400">
                  ({movie.voteCount} 평가)
                </span>
              )}
            </div>
            <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
              <div className="text-sm text-slate-600">
                <p className="font-semibold text-slate-900">개봉일</p>
                <p className="mt-1">{movie.releaseDate || "정보 없음"}</p>
              </div>

              <div className="flex-1">
                <p className="text-center text-sm font-semibold text-slate-900">
                  인기도
                </p>
                <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${popularityPercent}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="mb-2 text-sm font-semibold text-slate-900">
                줄거리
              </h3>
              <p className="max-h-40 overflow-y-auto text-sm leading-relaxed text-slate-700">
                {movie.overview || "등록된 줄거리 정보가 없습니다."}
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  window.open(
                    `https://www.themoviedb.org/search?query=${encodeURIComponent(
                      movie.title
                    )}`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                TMDB에서 검색
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
