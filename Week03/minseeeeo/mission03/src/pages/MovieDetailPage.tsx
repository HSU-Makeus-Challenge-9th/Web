import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { MovieDetails, MovieDetailsResponse } from "../types/movieDetails";
import NotFoundPage from "./NotFoundPage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { MovieCredits, MovieCreditsResponse } from "../types/movieCredits";
import { MovieOverview } from "../components/MovieOverview";
import { MovieCreditsCard } from "../components/MovieCreditsCard";

const MovieDetailPage = () => {
  const [isPending, setIsPending] = useState(false); // 로딩 상태
  const [isError, setIsError] = useState(false); // 에러 상태
  const [movieDetails, setMovieDetails] = useState<MovieDetails>(); // 영화 상세 정보
  const [movieCredits, setMovieCredits] = useState<MovieCredits[]>([]); // 영화 크레딧 정보

  const { movieId } = useParams();
  console.log("movie detail params: ", movieId);

  // movieId로 영화 상세정보 가져오기 (details api)
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsPending(true);
        const response = await axios.get<MovieDetailsResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-kr`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        // response.data에서 필요한 데이터만 구조분해할당
        console.log(response.data);
        const {
          title,
          vote_average,
          release_date,
          runtime,
          tagline,
          overview,
          poster_path,
          backdrop_path,
        } = response.data;
        setMovieDetails({
          title,
          vote_average,
          release_date,
          runtime,
          tagline,
          overview,
          poster_path,
          backdrop_path,
        });
      } catch (error) {
        console.error("영화 상세 정보 조회 실패:", error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovieDetails();
  }, []);

  // movieId로 크레딧 정보 가져오기 (Credits api)
  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        setIsPending(true);
        const response = await axios.get<MovieCreditsResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-kr`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        const { cast } = response.data;
        setMovieCredits(cast);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovieCredits();
  }, []);

  // 에러 처리
  if (isError) return <NotFoundPage />;

  // 로딩중 처리
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!movieDetails || !movieCredits) {
    return <div>영화 세부정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <MovieOverview details={movieDetails} />
      <MovieCreditsCard credits={movieCredits} />
    </div>
  );
};

export default MovieDetailPage;
