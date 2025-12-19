import type { Movie } from "../types/movie";

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetailModal = ({ movie, onClose }: MovieDetailModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-2xl font-bold text-white"
        >
          ×
        </button>
        {movie.backdrop_path && (
          <div className="relative h-64 w-full overflow-hidden">
            <img
              src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
              alt={movie.title}
              className="h-full w-full object-cover"
            />

            {/* 왼쪽 아래 텍스트 오버레이 */}
            <div className="absolute bottom-4 left-6">
              <h2 className="text-2xl font-bold text-white drop-shadow">
                {movie.title}
              </h2>
              <p className="text-sm text-gray-200 drop-shadow">
                {movie.original_title} {movie.original_language.toUpperCase()}
              </p>
            </div>
          </div>
        )}

        {/* 본문 */}
        <div className="flex gap-6 p-6">
          {/* 포스터 */}
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-60 rounded-lg object-cover shadow-md"
          />

          {/* 정보 */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-4 text-sm">
              <span>⭐ {movie.vote_average.toFixed(1)}</span>
              <span>({movie.vote_count}명 평가)</span>
              <span>📅 {movie.release_date}</span>
              <span>🔥 인기도 {movie.popularity.toFixed(0)}</span>
            </div>
            <div className="mt-8 font-bold flex flex-cols justify-center">줄거리</div>

            <p className="mt-2 text-gray-800 leading-relaxed text-gray-800">
              {movie.overview || "줄거리 정보 없음"}
            </p>

            {/* 버튼 영역 */}
            <div className="mt-auto flex gap-4 pt-4">
              <a
                href={`https://www.imdb.com/find?q=${encodeURIComponent(
                  movie.title
                )}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-yellow-400 px-4 py-2 font-bold"
              >
                IMDb에서 검색
              </a>

              <button
                onClick={onClose}
                className="rounded-lg bg-gray-200 px-4 py-2"
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

export default MovieDetailModal;
