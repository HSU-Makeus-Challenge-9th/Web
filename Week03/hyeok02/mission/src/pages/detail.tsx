import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import MovieDetailContent from "../components/movie-detail/detailcontent";
import type { Movie } from "../types/movie";

interface CastMember {
  id: number;
  name: string;
  original_name: string;
  profile_path: string;
  job?: string;
}

interface Credits {
  cast: CastMember[];
  crew: CastMember[];
}

const fetchMovieDetails = async (movieId: string): Promise<Movie> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("영화 상세 정보를 가져오는 데 실패했습니다.");
  }
  return response.json();
};

const fetchCredits = async (movieId: string): Promise<Credits> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("영화 크레딧 정보를 가져오는 데 실패했습니다.");
  }
  return response.json();
};

const MovieDetails = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const { data: movie, isLoading: isMovieLoading, error: movieError } = useQuery(
    ["movieDetails", movieId],
    () => fetchMovieDetails(movieId as string),
    { enabled: !!movieId }
  );

  const { data: castAndCrew, isLoading: isCreditsLoading, error: creditsError } = useQuery(
    ["movieCredits", movieId],
    () => fetchCredits(movieId as string),
    { enabled: !!movieId }
  );

  if (isMovieLoading || isCreditsLoading) {
    return <p className="text-white text-center mt-10">영화 정보를 불러오는 중입니다...</p>;
  }

  if (movieError || creditsError) {
    return <p className="text-red-500 text-center mt-10">에러가 발생했습니다.</p>;
  }

  const directorInfo = castAndCrew?.crew?.find((member) => member.job === "Director");
  const mainCast = castAndCrew?.cast?.slice(0, 10) || [];

  return (
    <MovieDetailContent
      movie={movie!}
      directorInfo={directorInfo}
      mainCast={mainCast}
    />
  );
  
};

export default MovieDetails;
