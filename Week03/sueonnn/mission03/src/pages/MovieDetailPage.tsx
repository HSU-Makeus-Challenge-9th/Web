// src/pages/MovieDetailPage.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { MovieDetails, Credits, Cast, Crew } from "../types/Movie";
import { LoadingSpinner } from "../components/common"; // 로딩 스피너 재사용

// 이미지 기본 URL
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";
const API_BASE_URL = "https://api.themoviedb.org/3/movie/";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface DetailData {
  details: MovieDetails | null;
  credits: Credits | null;
  loading: boolean;
  error: string | null;
}

const MovieDetailPage: React.FC = () => {
  // useParams를 사용하여 URL에서 'movie_id' 값을 추출합니다.
  const { movie_id } = useParams<{ movie_id: string }>();
  const navigate = useNavigate();

  const [data, setData] = useState<DetailData>({
    details: null,
    credits: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!movie_id || !TMDB_API_KEY) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: "유효하지 않은 영화 ID 또는 API 키입니다.",
      }));
      return;
    }

    const fetchDetails = async () => {
      setData((prev) => ({ ...prev, loading: true, error: null }));

      const headers = {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      };

      try {
        // 1. 영화 상세 정보 요청
        const detailsPromise = axios.get<MovieDetails>(
          `${API_BASE_URL}${movie_id}?language=ko-KR`,
          { headers }
        );
        // 2. 출연진/제작진 정보 요청
        const creditsPromise = axios.get<Credits>(
          `${API_BASE_URL}${movie_id}/credits?language=ko-KR`,
          { headers }
        );

        // 두 요청을 Promise.all로 동시에 처리하여 로딩 시간을 최적화합니다.
        const [detailsRes, creditsRes] = await Promise.all([
          detailsPromise,
          creditsPromise,
        ]);

        setData({
          details: detailsRes.data,
          credits: creditsRes.data,
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error("상세 정보 호출 오류:", err);
        setData({
          details: null,
          credits: null,
          loading: false,
          error: "영화 정보를 불러오는 데 실패했습니다. 다시 시도해 주세요.",
        });
      }
    };

    fetchDetails();
  }, [movie_id]); // 🚨 movieId가 변경될 때마다 데이터를 다시 불러옵니다.

  const { details, credits, loading, error } = data;

  // === 로딩 처리 ===
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // === 에러 처리 ===
  if (error) {
    return (
      <div className="text-center p-10">
        <p className="text-2xl text-red-500 font-bold mb-4">🚨 {error}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded"
        >
          이전 목록으로 돌아가기
        </button>
      </div>
    );
  }

  // 데이터가 없거나 유효하지 않을 때
  if (!details) {
    return (
      <div className="text-center p-10 text-xl">
        영화 정보를 찾을 수 없습니다.
      </div>
    );
  }

  // === UI 디자인 및 데이터 시각화 ===

  // 감독 정보 추출 (Crew 중 'Director' 직업을 가진 사람)
  const director = credits?.crew.find(
    (member: Crew) => member.job === "Director"
  );
  // 주요 출연진 5명만 추출
  const mainCast = credits?.cast.slice(0, 5) || [];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* 배경 이미지 (backdrop) */}
      <div
        className="relative bg-cover bg-center h-96 rounded-xl overflow-hidden mb-10"
        style={{
          backgroundImage: `url(${BASE_IMAGE_URL}original${details.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70 flex items-end p-8">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            {details.title}
          </h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 포스터 및 기본 정보 */}
        <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start">
          <img
            src={`${BASE_IMAGE_URL}w500${details.poster_path}`}
            alt={details.title}
            className="w-full max-w-xs rounded-lg shadow-2xl mb-6"
          />
          <p className="text-2xl font-bold text-yellow-400 mb-2">
            ⭐ 평점: {details.vote_average.toFixed(1)}
          </p>
          <p className="text-gray-400">개봉일: {details.release_date}</p>
          <p className="text-gray-400">상영 시간: {details.runtime}분</p>
        </div>

        {/* 상세 줄거리 및 크레딧 */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl font-bold mb-3 border-b border-gray-700 pb-2">
            줄거리
          </h2>
          <p className="text-lg text-gray-300 mb-8">{details.overview}</p>

          <p className="italic text-yellow-500 mb-6">"{details.tagline}"</p>

          <h2 className="text-3xl font-bold mb-4 border-b border-gray-700 pb-2">
            출연진 및 제작진
          </h2>

          {/* 감독 정보 */}
          {director && (
            <div className="mb-6">
              <p className="text-xl font-bold">감독: {director.name}</p>
              <p className="text-sm text-gray-400">{director.job}</p>
            </div>
          )}

          {/* 주요 출연진 목록 */}
          <div className="flex flex-wrap gap-4">
            {mainCast.map((actor: Cast) => (
              <div key={actor.id} className="w-32 text-center">
                <img
                  src={
                    actor.profile_path
                      ? `${BASE_IMAGE_URL}w200${actor.profile_path}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={actor.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-2 border-2 border-gray-600"
                />
                <p className="font-semibold text-sm line-clamp-1">
                  {actor.name}
                </p>
                <p className="text-xs text-gray-400 line-clamp-1">
                  {actor.character}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
