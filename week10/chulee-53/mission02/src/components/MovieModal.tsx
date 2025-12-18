import type { Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClickToggleModal: () => void;
}

const MovieModal = ({ movie, onClickToggleModal }: MovieModalProps) => {
  const popularityPercent = Math.round((movie.vote_average / 10) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="relative h-[400px] w-full bg-black">
          {movie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="h-full w-full object-cover opacity-80"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          <button
            onClick={onClickToggleModal}
            className="absolute right-8 top-4 text-4xl text-white"
          >
            ×
          </button>

          <div className="absolute bottom-8 left-10 text-white">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="mt-1 text-sm opacity-80">{movie.original_title}</p>
          </div>
        </div>

        <div className="px-10 py-8">
          <div className="flex gap-8">
            {/* Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-80 rounded-xl shadow-lg"
            />

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-blue-600">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-sm text-gray-400">
                  ({movie.vote_count} 평가)
                </span>
              </div>

              <div>
                <p className="text-lg font-semibold text-gray-900">개봉일</p>
                <p className="text-lg">{movie.release_date || "정보 없음"}</p>
              </div>

              <div>
                <p className="mb-1 text-lg font-semibold text-gray-900">
                  인기도
                </p>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${popularityPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <p className="mb-1 text-lg font-semibold text-gray-900">
                  줄거리
                </p>
                <p className="overflow-y-auto text-md leading-relaxed">
                  {movie.overview || "등록된 줄거리 정보가 없습니다."}
                </p>
              </div>

              <div className="mt-auto flex gap-3">
                <button
                  onClick={() =>
                    window.open(
                      `https://www.themoviedb.org/search?query=${encodeURIComponent(
                        movie.title
                      )}`,
                      "_blank"
                    )
                  }
                  className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white"
                >
                  IMDb에서 검색
                </button>
                <button
                  onClick={onClickToggleModal}
                  className="rounded-md border border-blue-500 text-blue-500 px-4 py-2 text-sm"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
