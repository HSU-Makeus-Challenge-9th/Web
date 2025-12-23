import { useQuery } from "@tanstack/react-query";
import { getSearchMovie, getTopRatedMovie } from "../../apis/movie";
import type { MovieParam, TopRatedMovieParam } from "../../types/movie";

interface useMovieParams {
  params: MovieParam;
}

interface useTopRatedParams {
  params: TopRatedMovieParam;
}

export const useTopRatedMovie = ({ params }: useTopRatedParams) => {
  return useQuery({
    queryKey: ["topRated", params.language, params.page, params.region],
    queryFn: () => getTopRatedMovie(params),

    staleTime: 5 * 60 * 1_000, // 5분
    gcTime: 10 * 60 * 1_000, // 10분
  });
};

export const useMovie = ({ params }: useMovieParams) => {
  return useQuery({
    queryKey: [
      "searchMovie",
      params.query,
      params.language,
      params.include_adult,
    ],
    queryFn: () => getSearchMovie(params),

    staleTime: 5 * 60 * 1_000, // 5분
    gcTime: 10 * 60 * 1_000, // 10분
  });
};
