import Credit from "./credit";

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

interface Person {
  name: string;
  original_name: string;
  profile_path: string;
}

interface Props {
  movie: Movie;
  directorInfo?: Person;
  mainCast: Person[];
}

const MovieDetailContent = ({ movie, directorInfo, mainCast }: Props) => {
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
          <p>평점: {movie?.vote_average ? `${movie.vote_average} / 10` : "평점 정보가 없습니다."}</p>
          <p>상영 시간: {movie?.runtime ? `${movie.runtime}분` : "상영 시간 정보가 없습니다."}</p>
          <p>태그라인: {movie?.tagline || "N/A"}</p>
          <p>{movie?.overview || "줄거리 정보가 없습니다."}</p>
        </div>
      </section>

      <h2 className="text-2xl font-bold text-white">제작진 및 주요 출연진</h2>
      <div className="flex flex-wrap gap-10 py-4">
        {directorInfo ? (
          <Credit
            role="감독"
            name={directorInfo.name}
            originalName={directorInfo.original_name}
            profilePath={directorInfo.profile_path}
          />
        ) : (
          <div className="text-white">감독 정보가 없습니다.</div>
        )}

        {mainCast && mainCast.length > 0 ? (
          mainCast.map((actor) => (
            <Credit
              key={actor.name}
              role="출연진"
              name={actor.name}
              originalName={actor.original_name}
              profilePath={actor.profile_path}
            />
          ))
        ) : (
          <div className="text-white">출연진 정보가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailContent;
