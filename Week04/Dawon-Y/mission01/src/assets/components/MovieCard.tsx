import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../constants/movie';
import type { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  const posterUrl = movie.poster_path 
    ? `${IMAGE_BASE_URL}/w500${movie.poster_path}` 
    : '/placeholder-movie.jpg';
  
  return (
    <div 
      className="relative cursor-pointer transition-transform duration-200 hover:scale-105 aspect-[2/3] rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <img
        src={posterUrl}
        alt={movie.title}
        className={`w-full h-full object-cover transition-all duration-300 ${
          isHovered ? 'blur-sm' : 'blur-none'
        }`}
      />
      
      {isHovered && (
        <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center z-10">
          <h3 className="text-white text-sm font-bold mb-3 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
            {movie.title}
          </h3>
          <p className="text-white text-xs drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] overflow-hidden line-clamp-4">
            {movie.overview}
          </p>
        </div>
      )}
    </div>
  );
}