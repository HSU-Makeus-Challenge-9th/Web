import { memo } from 'react';

interface Movie {
  id: number;
  title: string;
  original_title?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  release_date: string;
  vote_average: number;
  vote_count?: number;
  overview: string;
}

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export const MovieCard = memo(({ movie, onClick }: MovieCardProps) => {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div 
      className="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105 cursor-pointer"
      onClick={() => onClick(movie)}
    >
      <img src={posterUrl} alt={movie.title} className="h-auto w-full object-cover" />
      <div className="p-4">
        <h3 className="truncate font-bold">{movie.title}</h3>
        <p className="text-sm text-gray-500">{movie.release_date}</p>
        <span className="mt-2 inline-block rounded bg-yellow-400 px-2 py-1 text-xs font-bold">
          ⭐ {movie.vote_average.toFixed(1)}
        </span>
      </div>
    </div>
  );
});

MovieCard.displayName = 'MovieCard';