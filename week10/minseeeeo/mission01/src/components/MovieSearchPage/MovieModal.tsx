import { memo, useCallback } from "react";
import type { Movie } from "../../types/movie";

interface IMovieModal {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
}

const MovieModal = ({ movie, isOpen, onClose }: IMovieModal) => {
  const handleImdbSearch = useCallback(() => {
    window.open(`https://www.imdb.com/find?q=${movie.title}`, "_blank");
  }, [movie.title]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      {/* 모달 창 */}
      <div
        className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 윗부분 (포스터 + 제목) */}
        <div className="relative h-90 w-full">
          {/* 닫기 */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 text-white hover:text-gray-300 transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* 이미지 */}
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />

          {/* 제목  */}
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-bold mb-1">{movie.title}</h2>
            <p className="text-sm text-gray-300 font-light">
              {movie.original_title}
            </p>
          </div>
        </div>

        {/* 아래 부분 (영화 정보) */}
        <div className="flex p-6 gap-8">
          {/* 포스터 */}
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-50 rounded-md shadow-lg"
            />
          </div>

          {/* 상세 정보 */}
          <div className="flex-1 flex flex-col">
            {/* 평점 */}
            <div className="flex items-center gap-2 mb-8">
              <span className="text-blue-500 text-2xl font-bold">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-500 text-sm">
                ({movie.vote_count} 평가)
              </span>
            </div>

            {/* 정보들 */}
            <div className="flex flex-col items-center justify-center gap-8 mb-8">
              {/* 개봉일 */}
              <div className="text-center">
                <h3 className="text-gray-900 font-medium mb-1">개봉일</h3>
                <p className="text-gray-600 text-sm">{movie.release_date}</p>
              </div>

              {/* 인기도 */}
              <div className="w-full text-center px-10">
                <h3 className="text-gray-900 font-medium mb-2">인기도</h3>
                <div className="relative w-full h-1.5 bg-gray-200 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-1.5 bg-blue-500 rounded-full"
                    style={{
                      width: `${Math.min(
                        (movie.popularity / 1000) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* 줄거리 */}
            <div className="mb-8 text-center">
              <h3 className="text-gray-900 font-bold mb-2">줄거리</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {movie.overview || "줄거리 정보가 없습니다."}
              </p>
            </div>

            {/* 버튼들 */}
            <div className="mt-auto flex gap-3">
              <button
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-sm text-sm font-medium transition-colors cursor-pointer"
                onClick={handleImdbSearch}
              >
                IMDb에서 검색
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-600 rounded-sm text-sm font-medium transition-colors cursor-pointer"
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
