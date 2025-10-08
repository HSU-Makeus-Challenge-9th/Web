import { useEffect, useState } from "react";
import type { moviedetail } from "../types/movieDetail";
import { moviedetailApi } from "../apis/movieApis";

export const useMovieDetail = (movieId: string) => {
  const [movieDetail, setMovieDetail] = useState<moviedetail | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await moviedetailApi.getMovieDetail(movieId);
        setMovieDetail(response.data);
      } catch (err) {
        setError("영화 상세 정보를 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetail();
    }
  }, [movieId]);

  return { movieDetail, loading, error };
};
