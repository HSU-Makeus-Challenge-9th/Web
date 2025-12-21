interface Movie {
  title?: string;
  original_title?: string;
  release_date?: string;
  vote_average?: number;
  runtime?: number;
  tagline?: string;
  overview?: string;
  poster_path?: string;
}

interface Props {
  movie: Movie;
}

const MovieDetailContent = ({ movie }: Props) => {
  return (
    <div className="flex flex-col w-full px-10 py-12 items-center gap-10 select-none">
      <section
        className="relative w-full min-h-[55vh] p-10 bg-cover bg-center rounded-xl overflow-hidden"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie?.poster_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-10 rounded-xl" />
        <div className="relative z-20 text-white flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{movie?.title || "제목 정보가 없습니다."}</h1>
          <p>원제: {movie?.original_title || "정보 없음"}</p>
          <p>개봉일: {movie?.release_date || "정보 없음"}</p>
          <p>
            평점:{" "}
            {movie?.vote_average
              ? `${movie.vote_average} / 10`
              : "평점 정보가 없습니다."}
          </p>
          <p>
            상영 시간:{" "}
            {movie?.runtime ? `${movie.runtime}분` : "상영 시간 정보가 없습니다."}
          </p>
          <p>태그라인: {movie?.tagline || "N/A"}</p>
          <p>{movie?.overview || "줄거리 정보가 없습니다."}</p>
        </div>
      </section>

      <div className="w-full flex justify-end">
        <a
          href={`https://www.imdb.com/find?q=${encodeURIComponent(movie?.title || "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded"
        >
          IMDb에서 검색
        </a>
      </div>
    </div>
  );
};

export default MovieDetailContent;
