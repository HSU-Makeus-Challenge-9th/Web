import { useParams } from "react-router-dom";
import type { CreditsResponse, Movie, Credit } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PersonCard } from "../components/PersonCard";
import { MovieBanner } from "../components/MovieBanner";
import useCustomFetch from "../hooks/useCustomFetch";

export const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  // 영화 상세 API
  const {
    data: movie,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useCustomFetch<Movie>(
    `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
      },
    },
    [id]
  );

  // 크레딧 API
  const {
    data: credits,
    isLoading: isCreditsLoading,
    isError: isCreditsError,
  } = useCustomFetch<CreditsResponse>(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
      },
    },
    [id]
  );

  if (isMovieLoading || isCreditsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isMovieError || isCreditsError || !movie) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-red-500 text-2xl">
          영화 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.
        </span>
      </div>
    );
  }

  const director = credits?.crew.find((c: Credit) => c.job === "Director");
  const allCast = credits?.cast ?? [];

  return (
    <div className="bg-black text-white">
      {/* 배너 */}
      <MovieBanner movie={movie} />

      {/* 감독/출연 */}
      <div className="p-4">
        <h2 className="text-4xl font-bold mb-10">감독/출연</h2>

        {/* 감독/출연 카드 */}
        <div className="grid grid-cols-10 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-10">
          {director && (
            <PersonCard
              key={director.id}
              name={director.name}
              character={director.job}
              profilePath={director.profile_path}
            />
          )}

          {allCast.map((actor) => (
            <PersonCard
              key={actor.id}
              name={actor.name}
              character={actor.character}
              profilePath={actor.profile_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
