import { useEffect, useState } from "react";
import type { credit } from "../types/movieDetail";
import { creditApi } from "../apis/movieApis";

export const useCredit = (movieId: string) => {
  const [credits, setCredits] = useState<credit | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await creditApi.getCredit(movieId);
        setCredits(response.data);
      } catch (err) {
        setError("크래딧 상세 정보를 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchCredits();
    }
  }, [movieId]);

  return { credits, loading, error };
};
