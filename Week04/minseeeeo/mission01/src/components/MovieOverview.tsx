import type { MovieDetails } from "../types/movieDetails";

interface MovieOverviewProps {
  details?: MovieDetails;
}
export const MovieOverview = ({ details }: MovieOverviewProps) => {
  return (
    <div className="relative w-full h-[50vh]">
      <img
        className="relative w-full h-[50vh] object-cover"
        src={`https://image.tmdb.org/t/p/original/${details?.backdrop_path}`}
        alt="{details?.title}의 포스터 이미지"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent " />
      <div className="absolute inset-0 text-white  max-w-sm md:max-w-lg lg:max-w-2xl p-3 md:p-3 lg:p-5 flex flex-col">
        <h2 className="text-lg md:text-3xl font-bold mb-2">{details?.title}</h2>

        <div className="">
          <p>평점 {details?.vote_average?.toFixed(1)}</p>
          <p>{details?.release_date?.substring(0, 4)}</p>
          <p>{details?.runtime}분</p>
        </div>
        <div className="text-lg mt-3 space-y-3 max-w-md">
          <p className="text-md font-bold md:text-xl italic">
            {details?.tagline}
          </p>
          <p className="text-sm  line-clamp-6">{details?.overview}</p>
        </div>
      </div>
    </div>
  );
};
