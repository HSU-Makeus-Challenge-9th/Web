import { memo, useEffect } from 'react';
import type { Movie } from '../../types/movies';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  useEffect(() => {
    if (movie) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [movie]);

  if (!movie) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleIMDbClick = () => {
    const searchQuery = encodeURIComponent(movie.title);
    window.open(`https://www.imdb.com/find?q=${searchQuery}`, '_blank');
  };

  const sliceText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-lg bg-black/60"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-4xl h-[700px] overflow-hidden relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center text-gray-800 text-xl z-10 transition-all shadow-lg font-bold"
        >
          ✕
        </button>

        <div className="relative h-[40%] flex-shrink-0">
          {movie.backdrop_path ? (
            <>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                <h2 className="text-4xl font-bold text-white drop-shadow-lg">
                  {movie.title}
                </h2>
                {movie.tagline && (
                  <p className="text-lg text-gray-200 italic drop-shadow-md">
                    {movie.tagline}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-center flex flex-col gap-2">
                <h2 className="text-4xl font-bold text-white">{movie.title}</h2>
                {movie.tagline && (
                  <p className="text-lg text-gray-300 italic">{movie.tagline}</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex h-[60%] overflow-hidden">
          <div className="w-1/3 p-6 flex items-start justify-center">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-lg shadow-xl"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">포스터 없음</span>
              </div>
            )}
          </div>

          <div className="w-2/3 p-6 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex gap-8">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-500">평점</p>
                  <p className="text-lg font-bold text-gray-900">
                    {movie.vote_average.toFixed(1)}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-500">개봉일</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {movie.release_date || '정보 없음'}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-500">인기도</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {movie.vote_average.toFixed(1)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-500">줄거리</p>
                <p className="text-gray-700 leading-relaxed">
                  {sliceText(movie.overview || '줄거리 정보가 없습니다.', 300)}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleIMDbClick}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                IMDb에서 검색
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
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

export default memo(MovieModal);
