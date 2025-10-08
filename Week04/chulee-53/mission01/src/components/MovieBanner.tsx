// components/MovieBanner.tsx
import type { Movie } from "../types/movie";

interface MovieBannerProps {
  movie: Movie;
}

export const MovieBanner = ({ movie }: MovieBannerProps) => {
  return (
    <div className="px-4">
      <div
        className="relative h-[400px] bg-cover bg-center rounded-xl overflow-hidden"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        {/* 투명 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"/>

        <div className="absolute inset-0 flex flex-col p-6">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p>평균 {movie.vote_average.toFixed(1)}</p>
          <p>{movie.release_date.slice(0, 4)}</p>
          <p>{movie.runtime}분</p>
          <p className="max-w-xl mt-2 line-clamp-9">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};
