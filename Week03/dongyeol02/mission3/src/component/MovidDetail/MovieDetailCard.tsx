import type { moviedetail } from "../../types/movieDetail";

interface MovieDetailCardProps {
  movieDetail: moviedetail; // 🎯 props 타입 정의
}

const MovieDetailCard = ({ movieDetail }: MovieDetailCardProps) => {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative">
      <img
        src={`https://image.tmdb.org/t/p/w1280${movieDetail?.backdrop_path}`}
        alt={movieDetail?.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-opacity-10 backdrop-blur-sm rounded-xl p-4 text-white flex flex-col justify-start gap-4">
        <div className="font-bold text-4xl">{movieDetail?.title}</div>
        <div className="flex flex-col">
          <span>평균 {movieDetail?.vote_average}</span>
          <span>{movieDetail?.release_date}</span>
          <span>{movieDetail?.runtime}분</span>
        </div>
        <div className="font-semibold text-2xl italic">
          {movieDetail?.tagline}
        </div>
        <div className="line-clamp-8">{movieDetail?.overview}</div>
      </div>
    </div>
  );
};

export default MovieDetailCard;
