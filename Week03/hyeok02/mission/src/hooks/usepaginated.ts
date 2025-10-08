import { useEffect, useState } from "react";
import axios from "axios";
import type { MovieResponse, Movie } from "../types/movie";

const usePaginatedMovies = (endpoint: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchPage = async (pageArg: number) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${endpoint}?language=ko-KR&page=${pageArg}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      setMovies(data.results);
    } catch (err) {
      console.error(err);
      setError("영화 데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPageWrapper = (nextPage: number) => {
    if (!Number.isFinite(nextPage) || nextPage < 1) return;
    setPage(nextPage);
    fetchPage(nextPage);
  };

  return { movies, loading, error, page, setPage: setPageWrapper };
};

export default usePaginatedMovies;
