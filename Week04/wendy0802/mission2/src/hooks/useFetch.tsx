import { useState, useEffect, useCallback } from "react";
import type {
  Movie,
  MovieResponse,
  MovieDetails,
  Credits,
} from "../types/movie";

const getAccessToken = () => {
  return (
    import.meta.env.VITE_TMDB_KEY ||
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDJhMjVhYzIxOGZhN2YzZDc1MDA4YzRmMjYwMmM0MyIsIm5iZiI6MTc0MzMzNTk4MS4wODcwMDAxLCJzdWIiOiI2N2U5MzIyZDcwMGE2YTk0YzZlNTRmZTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mRtBS7qXkSQp2y9QQnEVOlCA26FtaZwYmVgdIFrd66Y"
  );
};

const getHeaders = () => ({
  accept: "application/json",
  Authorization: `Bearer ${getAccessToken()}`,
});

export const useFetchMovies = (endpoint: string, initialPage: number = 1) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchMovies = useCallback(
    async (page: number) => {
      try {
        setLoading(true);
        setError(null);

        console.log(`${endpoint} 영화 API 호출 시작...`);

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${endpoint}?language=ko-KR&page=${page}`,
          {
            headers: getHeaders(),
          }
        );

        console.log("API 응답 상태:", res.status);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("API 에러 응답:", errorText);
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: MovieResponse = await res.json();
        console.log("받은 영화 데이터:", data);

        setMovies(data.results);
        setTotalPages(data.total_pages);
        setCurrentPage(page);
      } catch (err) {
        console.error("API 호출 중 에러 발생:", err);
        setError("영화 데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    },
    [endpoint]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      fetchMovies(page);
    },
    [fetchMovies]
  );

  const refetch = useCallback(() => {
    fetchMovies(currentPage);
  }, [fetchMovies, currentPage]);

  useEffect(() => {
    fetchMovies(initialPage);
  }, [fetchMovies, initialPage]);

  return {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    refetch,
  };
};

export const useFetchMovieDetail = (movieId: string | undefined) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieData = useCallback(async () => {
    if (!movieId) {
      setError("영화 ID가 없습니다.");
      setLoading(false);
      return;
    }

    if (!getAccessToken()) {
      setError("API 키가 설정되지 않았습니다.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log(`영화 상세 정보 요청: ${movieId}`);

      const [detailsResponse, creditsResponse] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, {
          headers: getHeaders(),
        }),
        fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: getHeaders(),
          }
        ),
      ]);

      console.log("Details response status:", detailsResponse.status);
      console.log("Credits response status:", creditsResponse.status);

      if (!detailsResponse.ok) {
        const errorText = await detailsResponse.text();
        console.error("Details API 에러:", errorText);
        throw new Error(
          `영화 상세 정보를 불러올 수 없습니다. (${detailsResponse.status})`
        );
      }

      if (!creditsResponse.ok) {
        const errorText = await creditsResponse.text();
        console.error("Credits API 에러:", errorText);
        throw new Error(
          `출연진 정보를 불러올 수 없습니다. (${creditsResponse.status})`
        );
      }

      const [detailsData, creditsData] = await Promise.all([
        detailsResponse.json(),
        creditsResponse.json(),
      ]);

      console.log("영화 상세 정보:", detailsData);
      console.log("출연진 정보:", creditsData);

      setMovieDetails(detailsData);
      setCredits(creditsData);
    } catch (err) {
      console.error("영화 상세 정보 로딩 중 에러:", err);
      setError(
        err instanceof Error
          ? err.message
          : "영화 정보를 불러오는데 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  const refetch = useCallback(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  return {
    movieDetails,
    credits,
    loading,
    error,
    refetch,
  };
};

export const useFetch = <T,>(
  url: string,
  options?: RequestInit,
  dependencies: unknown[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(url, {
        headers: getHeaders(),
        ...options,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("API 호출 중 에러 발생:", err);
      setError(
        err instanceof Error ? err.message : "데이터를 불러오는데 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData, dependencies]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
