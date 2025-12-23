// components/MovieModal.tsx
import type { Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const imdbSearchUrl = `https://www.imdb.com/find?q=${encodeURIComponent(
    movie.title
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose} // 바깥 클릭 시 닫기
    >
      {/* 모달 카드 */}
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 전파 방지
      >
        {/* 상단 포스터 */}
        <div className="w-full h-64 overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 내용 */}
        <div className="p-6 flex flex-col gap-4">
          {/* 제목 + 기본 정보 */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>평점 ⭐ {movie.vote_average.toFixed(1)}</span>
              <span>개봉일 {movie.release_date}</span>
            </div>
          </div>

          {/* 줄거리 */}
          <p className="text-sm text-gray-800 leading-relaxed max-h-40 overflow-y-auto">
            {movie.overview || "줄거리 정보가 없습니다."}
          </p>

          {/* 버튼 영역 */}
          <div className="flex justify-end gap-3 mt-4">
            {/* IMDb에서 검색하기 */}
            <a
              href={imdbSearchUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold"
            >
              IMDb에서 검색하기
            </a>

            {/* 닫기 버튼 */}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-semibold"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
