import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MovieDetails, Credits, Cast, Crew } from "../types/Movie";
import { LoadingSpinner } from "../components/common";
import useCustomFetch from "../hooks/useCustomFetch";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";
const API_BASE_URL = "https://api.themoviedb.org/3/movie/";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetailPage: React.FC = () => {
  const { movie_id } = useParams<{ movie_id: string }>();
  const navigate = useNavigate();

  // API URL 생성
  const detailsUrl = useMemo(() => {
    if (!movie_id || !TMDB_API_KEY) return null;
    return `${API_BASE_URL}${movie_id}?language=ko-KR`;
  }, [movie_id]);

  const creditsUrl = useMemo(() => {
    if (!movie_id || !TMDB_API_KEY) return null;
    return `${API_BASE_URL}${movie_id}/credits?language=ko-KR`;
  }, [movie_id]);

  const headers = useMemo(
    () => ({
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    }),
    []
  );

  // 🎯 커스텀 훅 사용: 영화 상세 정보
  const {
    data: details,
    loading: detailsLoading,
    error: detailsError,
  } = useCustomFetch<MovieDetails>(detailsUrl, { headers });

  // 🎯 커스텀 훅 사용: 출연진/제작진 정보
  const {
    data: credits,
    loading: creditsLoading,
    error: creditsError,
  } = useCustomFetch<Credits>(creditsUrl, { headers });

  // 로딩 상태 (두 요청 중 하나라도 로딩 중이면 로딩 표시)
  const loading = detailsLoading || creditsLoading;
  // 에러 상태 (두 요청 중 하나라도 에러가 있으면 에러 표시)
  const error = detailsError || creditsError;

  // === 로딩 처리 ===
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  // === 에러 처리 ===
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-x-hidden">
        <div className="text-center p-10">
          <p className="text-4xl text-red-500 font-bold mb-6">🚨 오류 발생</p>
          <p className="text-xl text-gray-300 mb-8">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            ← 이전 페이지로
          </button>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center p-10 text-xl text-gray-400">
          영화 정보를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  // === UI 디자인 및 데이터 시각화 ===

  // 감독 정보 추출
  const director = credits?.crew.find(
    (member: Crew) => member.job === "Director"
  );
  // 주요 출연진 상위 6명
  const mainCast = credits?.cast.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* 배경 이미지 헤더 */}
      <div
        className="relative bg-cover bg-center h-[500px] overflow-hidden"
        style={{
          backgroundImage: details.backdrop_path
            ? `url(${BASE_IMAGE_URL}original${details.backdrop_path})`
            : "linear-gradient(to bottom, #1f2937, #111827)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl font-extrabold text-white drop-shadow-2xl mb-4">
              {details.title}
            </h1>
            {details.tagline && (
              <p className="text-2xl italic text-yellow-400 drop-shadow-lg">
                "{details.tagline}"
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* 왼쪽: 포스터 및 기본 정보 */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start">
            <div className="relative group">
              <img
                src={
                  details.poster_path
                    ? `${BASE_IMAGE_URL}w500${details.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={details.title}
                className="w-full max-w-sm rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </div>

            {/* 정보 카드 */}
            <div className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl w-full max-w-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">⭐</span>
                <span className="text-3xl font-bold text-yellow-400">
                  {details.vote_average.toFixed(1)}
                </span>
              </div>

              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="font-semibold">개봉일</span>
                  <span>{details.release_date}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="font-semibold">상영 시간</span>
                  <span>{details.runtime}분</span>
                </div>
                {details.genres && details.genres.length > 0 && (
                  <div className="pt-2">
                    <span className="font-semibold block mb-2">장르</span>
                    <div className="flex flex-wrap gap-2">
                      {details.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 오른쪽: 줄거리 및 출연진 */}
          <div className="w-full lg:w-2/3">
            {/* 줄거리 */}
            <section className="mb-12">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                줄거리
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {details.overview || "줄거리 정보가 없습니다."}
              </p>
            </section>

            {/* 제작진 */}
            {director && (
              <section className="mb-12">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  감독
                </h2>
                <div className="flex items-center gap-4 bg-gray-800/50 p-6 rounded-xl">
                  <img
                    src={
                      director.profile_path
                        ? `${BASE_IMAGE_URL}w200${director.profile_path}`
                        : "https://via.placeholder.com/100"
                    }
                    alt={director.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-yellow-500"
                  />
                  <div>
                    <p className="text-2xl font-bold text-yellow-400">
                      {director.name}
                    </p>
                    <p className="text-gray-400">{director.job}</p>
                  </div>
                </div>
              </section>
            )}

            {/* 출연진 */}
            {mainCast.length > 0 && (
              <section>
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  주요 출연진
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {mainCast.map((actor: Cast) => (
                    <div
                      key={actor.id}
                      className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <img
                        src={
                          actor.profile_path
                            ? `${BASE_IMAGE_URL}w200${actor.profile_path}`
                            : "https://via.placeholder.com/200"
                        }
                        alt={actor.name}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                      <p className="font-bold text-lg text-white line-clamp-1">
                        {actor.name}
                      </p>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {actor.character}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
