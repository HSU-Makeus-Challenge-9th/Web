import type {
  MovieParam,
  ResponseSearchMovie,
  TopRatedMovieParam,
} from "../types/movie";
import axiosInstance from "./axios";

export const getTopRatedMovie = async (
  params: TopRatedMovieParam
): Promise<ResponseSearchMovie> => {
  const { data } = await axiosInstance.get("3/movie/top_rated", {
    params: params,
  });
  return data;
};

export const getSearchMovie = async (
  params: MovieParam
): Promise<ResponseSearchMovie> => {
  const { data } = await axiosInstance.get("/3/search/movie", {
    params: params,
  });
  return data;
};
