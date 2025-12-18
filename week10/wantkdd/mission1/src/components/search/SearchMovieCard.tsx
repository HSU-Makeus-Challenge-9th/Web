import { memo } from 'react';
import type { Movie } from '../../types/movies';

interface SearchMovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const SearchMovieCard = ({ movie, onClick }: SearchMovieCardProps) => {
  const handleClick = () => {
    onClick(movie);
  };

  return (
    <div
      onClick={handleClick}
      className="relative overflow-hidden rounded-xl cursor-pointer group"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto object-cover group-hover:blur-sm transition-all duration-200"
      />
      <div className="absolute inset-0 bg-black/60 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <p className="text-white font-bold text-sm mb-2 text-center line-clamp-2">
          {movie.title}
        </p>
        <div className="flex items-center gap-1 mb-2">
          <span className="text-white text-xs font-semibold">
            ⭐️{movie.vote_average.toFixed(1)}
          </span>
        </div>
        <p className="text-gray-300 text-xs line-clamp-3 text-center">
          {movie.overview || '줄거리 정보가 없습니다.'}
        </p>
      </div>
    </div>
  );
};

export default memo(SearchMovieCard);
