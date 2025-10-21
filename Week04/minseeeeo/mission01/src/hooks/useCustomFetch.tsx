import { useState, useEffect } from "react";
import axios from "axios";

interface useCustomFetchResult<T> {
  data: T | null;
  isPending: boolean;
  isError: boolean;
}

function useCustomFetch<T>(
  url: string,
  dependencies: React.DependencyList = []
): useCustomFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      setIsPending(true);
      setIsError(false);

      try {
        const response = await axios.get<T>(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setData(response.data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, isPending, isError };
}

export default useCustomFetch;
