import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await axios.get<MovieResponse>(
          "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          }
        );

        setMovies(data.results);
      } catch (err) {
        setError("영화 데이터를 가져오는데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};
