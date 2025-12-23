import React from "react";
import { Movie } from "../types/movie";

interface Props {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: Props) => {
  const handleIMDbSearch = () => {
    window.open(
      `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`,
      "_blank"
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black text-white w-10 h-10 rounded-full transition"
        >
          ✕
        </button>

        <div className="w-full md:w-2/5">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="w-full h-full object-cover"
            alt={movie.title}
          />
        </div>

        <div className="p-8 flex-1 flex flex-col overflow-y-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            {movie.title}
          </h2>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-yellow-500 font-bold text-xl">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600 font-medium">
              개봉: {movie.release_date}
            </span>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">
              줄거리
            </h4>
            <p className="text-gray-600 leading-relaxed italic">
              {movie.overview || "상세 줄거리가 준비되지 않았습니다."}
            </p>
          </div>

          <div className="mt-auto flex gap-3">
            <button
              onClick={handleIMDbSearch}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition"
            >
              IMDb에서 검색하기
            </button>
            <button
              onClick={onClose}
              className="px-8 py-4 border border-gray-200 font-bold rounded-xl hover:bg-gray-50 transition"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
