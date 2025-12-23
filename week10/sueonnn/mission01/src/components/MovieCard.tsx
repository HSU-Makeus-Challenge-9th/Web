import React from "react";
import { Movie } from "../types/movie";

interface Props {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard = ({ movie, onClick }: Props) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div
      onClick={() => onClick(movie)}
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 truncate">{movie.title}</h3>
        <p className="text-sm text-gray-500">
          {movie.release_date?.split("-")[0]}
        </p>
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
          ⭐ {movie.vote_average.toFixed(1)}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
