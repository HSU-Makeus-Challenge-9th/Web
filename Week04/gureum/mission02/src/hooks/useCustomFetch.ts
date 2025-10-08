import { useEffect, useMemo, useState } from "react";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";

/**
 * Generic data fetching hook
 * - Returns { data, loading, error }
 * - Refetches when url or deps change
 */
export function useCustomFetch<T>(
  url: string | null,
  config?: AxiosRequestConfig,
  deps: unknown[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Stabilize config dependency using JSON stringify of relevant parts
  const stableConfig = useMemo(() => config, [JSON.stringify(config)]);

  useEffect(() => {
    if (!url) return;
    let canceled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get<T>(url, stableConfig);
        if (!canceled) setData(res.data);
      } catch (err: any) {
        if (canceled) return;
        const message = err?.response?.data?.status_message || err?.message || "요청 중 오류가 발생했습니다.";
        setError(message);
      } finally {
        if (!canceled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      canceled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, stableConfig, ...deps]);

  return { data, loading, error } as const;
}
