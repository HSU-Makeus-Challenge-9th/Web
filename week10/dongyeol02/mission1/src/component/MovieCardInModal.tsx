// components/MovieCard.tsx
import { memo } from "react";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}

const MovieCardInModal = ({ movie, onClick }: MovieCardProps) => {
  const handleClick = () => {
    if (onClick) onClick(movie);
  };

  return (
    <div className="relative group cursor-pointer" onClick={handleClick}>
      <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 group-hover:blur-sm"
        />
        <div
          className="absolute inset-0 
                      opacity-0              
                      group-hover:opacity-100
                      transition-opacity  
                      duration-300
                      text-white
                      flex flex-col items-center gap-4
                      m-4"
        >
          <h3 className="text-2xl">{movie.title}</h3>
          <p className="line-clamp-5 text-sm">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieCardInModal);
