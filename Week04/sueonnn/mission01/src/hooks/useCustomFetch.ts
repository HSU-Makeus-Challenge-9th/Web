import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface UseCustomFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * 커스텀 훅: useCustomFetch
 * API 호출, 로딩 상태, 에러 처리를 일원화합니다.
 *
 * @param url - 요청할 API URL
 * @param options - axios 요청 옵션 (headers 등)
 * @returns { data, loading, error }
 */
function useCustomFetch<T>(
  url: string | null,
  options?: AxiosRequestConfig
): UseCustomFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // URL이 없으면 요청하지 않음
    if (!url) {
      setLoading(false);
      setError("유효하지 않은 URL입니다.");
      return;
    }

    // 요청 취소를 위한 AbortController
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<T>(url, {
          ...options,
          signal: abortController.signal,
        });

        setData(response.data);
      } catch (err) {
        // 요청이 취소된 경우 에러 처리 안 함
        if (axios.isCancel(err)) {
          console.log("요청이 취소되었습니다.");
          return;
        }

        console.error("API 호출 오류:", err);
        setError("데이터를 불러오는 데 실패했습니다. 다시 시도해 주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // 클린업: 컴포넌트 언마운트 또는 의존성 변경 시 요청 취소
    return () => {
      abortController.abort();
    };
  }, [url]); // URL이 변경될 때마다 재요청

  return { data, loading, error };
}

export default useCustomFetch;
