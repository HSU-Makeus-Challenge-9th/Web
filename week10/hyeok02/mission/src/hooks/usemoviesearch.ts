import { useEffect, useState } from "react";
import axios from "axios";
import type { MovieResponse, Movie } from "../types/movie";

interface SearchParams {
  query: string;
  includeAdult: boolean;
  language: string;
  page: number;
}

export const useMovieSearch = (params: SearchParams | null) => {
  const [data, setData] = useState<MovieResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!params || !params.query.trim()) return;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const res = await axios.get<MovieResponse>("https://api.themoviedb.org/3/search/movie", {
          params: {
            query: params.query,
            include_adult: params.includeAdult,
            language: params.language,
            page: params.page,
          },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        });

        const filtered = params.includeAdult
          ? res.data.results.filter((movie: Movie) => movie.adult === true)
          : res.data.results.filter((movie: Movie) => movie.adult === false);

        setData({
          ...res.data,
          results: filtered,
        });
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params]);

  return { data, isLoading, isError };
};
