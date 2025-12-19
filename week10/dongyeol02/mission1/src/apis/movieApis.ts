import axios from "axios";
import type { MovieResponse } from "../types/movie";
import type { credit, moviedetail } from "../types/movieDetail";

export const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Axios 인스턴스 생성!!!!
const movieApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

// API 함수들
export const movieApis = {
  // 인기 영화 가져오기 api
  getPopularMovies: (page: number = 1) =>
    movieApi.get<MovieResponse>(`/movie/popular?language=ko-KR&page=${page}`),

  // 평점 높은 영화 가져오기 api
  getTopRatedMovies: (page: number = 1) =>
    movieApi.get<MovieResponse>(`/movie/top_rated?language=ko-KR&page=${page}`),

  // 현재 상영중 가져오기 api
  getNowPlayingMovies: (page: number = 1) =>
    movieApi.get<MovieResponse>(
      `/movie/now_playing?language=ko-KR&page=${page}`
    ),

  // 개봉 예정 영화 가져오기 api
  getUpcomingMovies: (page: number = 1) =>
    movieApi.get<MovieResponse>(`/movie/upcoming?language=ko-KR&page=${page}`),
  searchMovies: ({
    query,
    includeAdult,
    language,
    page = 1,
  }: {
    query: string;
    includeAdult: boolean;
    language: string;
    page?: number;
  }) =>
    movieApi.get<MovieResponse>(
      `/search/movie?query=${encodeURIComponent(
        query
      )}&include_adult=${includeAdult}&language=${language}&page=${page}`
    ),
};

//영화 디테일 가져오기 api
export const moviedetailApi = {
  getMovieDetail: (movieId: string) =>
    movieApi.get<moviedetail>(`/movie/${movieId}?language=ko-KR`),
};

export const creditApi = {
  getCredit: (movieId: string) =>
    movieApi.get<credit>(`/movie/${movieId}/credits?language=ko-KR`),
};
