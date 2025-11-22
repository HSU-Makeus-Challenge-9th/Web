import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
}

function useCustomFetch<T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
  deps: any[] = []
) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setState({ data: null, isLoading: true, isError: false });
      try {
        const response = await axios<T>(url, config);
        if (isMounted) {
          setState({ data: response.data, isLoading: false, isError: false });
        }
      } catch (error) {
        if (isMounted) {
          setState({ data: null, isLoading: false, isError: true });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, ...deps]);

  return state;
}

export default useCustomFetch;
