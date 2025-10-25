import { useQuery } from "react-query";
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

const useMovieDetail = (movieId: string) => {
  const movieQuery = useQuery(["movieDetails", movieId], () => fetchMovieDetails(movieId), {
    enabled: !!movieId,
  });

  const creditsQuery = useQuery(["movieCredits", movieId], () => fetchCredits(movieId), {
    enabled: !!movieId,
  });

  return {
    movie: movieQuery.data,
    isLoading: movieQuery.isLoading || creditsQuery.isLoading,
    error: movieQuery.error || creditsQuery.error,
    director: creditsQuery.data?.crew.find((member) => member.job === "Director"),
    cast: creditsQuery.data?.cast.slice(0, 10) || [],
  };
};

export default useMovieDetail;
