import { useParams } from "react-router-dom";
import type { MovieDetailsResponse } from "../types/movieDetails";
import NotFoundPage from "./NotFoundPage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { MovieCreditsResponse } from "../types/movieCredits";
import { MovieOverview } from "../components/MovieOverview";
import { MovieCreditsCard } from "../components/MovieCreditsCard";
import useCustomFetch from "../hooks/useCustomFetch";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  console.log("movie detail params: ", movieId);

  // movieId로 영화 상세정보 가져오기 (details api)
  const {
    data: movieDetailsData,
    isPending: isDetailsPending,
    isError: isDetailsError,
  } = useCustomFetch<MovieDetailsResponse>(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-kr`,
    []
  );

  // movieId로 크레딧 정보 가져오기 (Credits api)
  const {
    data: movieCreditsData,
    isPending: isCreditsPending,
    isError: isCreditsError,
  } = useCustomFetch<MovieCreditsResponse>(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-kr`,
    []
  );

  // 에러 처리
  if (isDetailsError || isCreditsError) return <NotFoundPage />;

  // 로딩중 처리
  if (isDetailsPending || isCreditsPending) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  // 데이터가 있는지 판별
  if (!movieDetailsData || !movieCreditsData) {
    return <div>영화 세부정보를 찾을 수 없습니다ㅠㅠ</div>;
  }

  // 사용할거만 빼기
  const {
    title,
    vote_average,
    release_date,
    runtime,
    tagline,
    overview,
    poster_path,
    backdrop_path,
  } = movieDetailsData;

  const movieDetails = {
    title,
    vote_average,
    release_date,
    runtime,
    tagline,
    overview,
    poster_path,
    backdrop_path,
  };

  return (
    <div>
      <MovieOverview details={movieDetails} />
      <MovieCreditsCard credits={movieCreditsData.cast} />
    </div>
  );
};

export default MovieDetailPage;
