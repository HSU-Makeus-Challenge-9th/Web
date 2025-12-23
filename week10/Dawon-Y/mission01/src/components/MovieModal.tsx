import { memo, type MouseEvent } from 'react';

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

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export const MovieModal = memo(({ movie, onClose }: MovieModalProps) => {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleIMDbSearch = () => {
    const searchQuery = encodeURIComponent(movie.title);
    window.open(`https://www.imdb.com/find?q=${searchQuery}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-md bg-white shadow-md">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-xl text-white hover:bg-black/80 transition-all"
        >
          ✕
        </button>

        <div className="max-h-[90vh] overflow-y-auto">
          {backdropUrl && (
            <div className="relative h-72 w-full">
              <img 
                src={backdropUrl} 
                alt={movie.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          )}

          <div className="p-8">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex-shrink-0">
                <img 
                  src={posterUrl} 
                  alt={movie.title}
                  className="w-full rounded-lg shadow-lg md:w-56"
                />
              </div>

              <div className="flex-1">
                <h2 className="mb-2 text-3xl font-bold text-gray-900">
                  {movie.title}
                </h2>
                {movie.original_title && movie.original_title !== movie.title && (
                  <p className="mb-4 text-base text-gray-500">
                    {movie.original_title}
                  </p>
                )}

                <div className="mb-5 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400 px-4 py-2 text-xl font-bold text-gray-900">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </span>
                  {movie.vote_count && (
                    <span className="text-sm text-gray-500">
                      ({movie.vote_count.toLocaleString()} 평가)
                    </span>
                  )}
                </div>

                <div className="mb-5">
                  <h3 className="mb-2 text-lg font-semibold text-gray-700">개봉일</h3>
                  <p className="text-base text-gray-600">
                    {movie.release_date || '미정'}
                  </p>
                </div>

                <div className="mb-5">
                  <h3 className="mb-2 text-lg font-semibold text-gray-700">인기도</h3>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${Math.min(movie.vote_average * 10, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="mb-2 text-lg font-semibold text-gray-700">줄거리</h3>
                  <p className="text-base leading-relaxed text-gray-600">
                    {movie.overview || '줄거리 정보가 없습니다.'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleIMDbSearch}
                    className="flex-1 rounded-lg bg-blue-600 px-6 py-3.5 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
                  >
                    IMDb에서 검색
                  </button>
                  <button
                    onClick={onClose}
                    className="rounded-lg border-2 border-gray-300 px-6 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

MovieModal.displayName = 'MovieModal';